import {AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TrainerService} from "../../../../service/trainer.service";
import {OwlOptions} from "ngx-owl-carousel-o";
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventService } from 'src/service/event.service';
import { EMPTY, catchError, delay, of, tap } from 'rxjs';
import { SharedService } from 'src/service/shared.service';
import { EnumsService } from 'src/service/enums.service';
import { AuthService } from 'src/service/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Width } from 'ngx-owl-carousel-o/lib/services/carousel.service';
import { FormControl } from '@angular/forms';
import { TicketService } from 'src/service/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { TicketChartComponent } from '../chart/chart.component';
import { PdfGeneratorService } from 'src/service/pdf.service';

@Component({
    selector: 'app-candidate-details-page',
    templateUrl: './candidate-details-page.component.html',
    styleUrls: ['./candidate-details-page.component.scss']
})
export class CandidateDetailsPageComponent implements OnInit, AfterViewInit {

    eventData;
    eventId: string;
    filterEvent: string;
    imageUrl:string;
    isOrganiserEvent:boolean = false;
    numberTickets = new FormControl(1);
    numbers: number[] = Array.from({length: 10}, (_, i) => i+1);
    @ViewChild('paymentDialog', { static: true }) paymentDialog: TemplateRef<any>;


    constructor(public trainerService: TrainerService, private route: ActivatedRoute, public eventService: EventService, 
        private sharedService: SharedService, private enumsService: EnumsService, public authService: AuthService,
        private dialog: MatDialog, private router:Router, private ticketService: TicketService,
        public pdfService: PdfGeneratorService
      ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.eventId = params.get('id');
          });
    }



    ngAfterViewInit(){ 
        this.eventService.getEventDetailsById(this.eventId).pipe(
          delay(0),
          tap(()=> this.sharedService.isLoading(true)),
          catchError(err => {
            if(err.status !== 200){
              this.sharedService.isLoading(false);
              return EMPTY
            }
            else{
              return of(err);
            }
            
          })
        ).subscribe((res:any )=>{
            this.eventData = res;
            this.checkIfUserIsOrganiserEvent(res);
            this.imageUrl = 'data:image/webp;base64,'+res.image;
            this.sharedService.isLoading(false);   
          })
      }

      getTypeName(){
        let typesToArray = this.enumsService.types$.getValue();
        return typesToArray.find(x => x.id == this.eventData.type)?.type
      }

      checkIfUserIsOrganiserEvent(eventData){
        this.isOrganiserEvent = eventData.organiserId ==this.authService.getUserId()
      }

      openPaymentDialog() {
        this.dialog.open(this.paymentDialog, {
          maxWidth: '700px',
      });
      }

      editEvent(id){
        this.router.navigate(['/post-an-event/'+id])
      }

      deleteEvent(id){
        this.eventService.deleteEvent(this.eventId).pipe(
          delay(0),
          tap(()=> this.sharedService.isLoading(true)),
          catchError(err => {
            if(err.status !== 200){
              this.sharedService.isLoading(false);
              return EMPTY
            }
            else{
              return of(err);
            }
            
          })
        ).subscribe((res:any )=>{
          
            this.router.navigate(['my-organised-events-listings'])
            this.sharedService.isLoading(false);   
          })
      }

      saveRemovedEvent(event){
        this.eventService.likeAndSaveEvent(event).subscribe();
     }

     removeSavedEvent(event){
      this.eventService.unlikeAndRemoveEvent(event).subscribe();

  }

  getSumForPayment(){
    return this.numberTickets.value*this.eventData.price
  }

  getAnalys(eventId){
    this.dialog.open(TicketChartComponent, {
      width: '700px',
    data:{eventId: eventId}      
  });
  }
  
  getTicketList(eventData){
    this.ticketService.getTicketList(eventData.id).pipe(
      catchError(err => {
        if(err.status !== 200){
          return EMPTY
        }
        else{
          this.sharedService.errorMessage(err.error)
          this.sharedService.isLoading(false)
          return of(err);
        }
        
      })
    ).subscribe(res=>{
      if(res.length==0){
        this.sharedService.errorMessage("За момента няма закупени билети")
      }
      else {
        this.pdfService.processData(res);
        this.sharedService.isLoading(false);  
        this.pdfService.generatePdf(this.eventData.header, this.eventData.date)
      }
    });
  }

  goToPayment(){
    this.ticketService.buyTickets(this.eventId, this.numberTickets.value)
    .pipe(
      tap(() => this.sharedService.isLoading(true)),
      tap((res: any) => {
        // Успешна заявка - статус 200
        this.router.navigateByUrl('payment');
        this.sharedService.successMessage(res.message)
        this.sharedService.isLoading(false)
      }),
      catchError(err => {
        // Обработка на грешки
        this.sharedService.errorMessage(err.error)
        console.error(err.error); // Логване на съобщението за грешка
        this.sharedService.isLoading(false)
        return EMPTY; // Прекратяване на потока
      })
    )
    .subscribe();
  }
}