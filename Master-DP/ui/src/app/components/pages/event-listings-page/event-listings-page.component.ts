import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CityService} from "../../../../service/city.service";
import {TrainerService} from "../../../../service/trainer.service";
import {ActivatedRoute, Router} from "@angular/router";
import { EnumsService } from 'src/service/enums.service';
import { Cities } from 'src/service/bulgarian-towns';
import { EventService } from 'src/service/event.service';
import { EMPTY, catchError, delay, of, tap } from 'rxjs';
import { SharedService } from 'src/service/shared.service';
import { AuthService } from 'src/service/auth.service';

@Component({
    selector: 'app-event-listings-page',
    templateUrl: './event-listings-page.component.html',
    styleUrls: ['./event-listings-page.component.scss']
})
export class EventListingsPageComponent implements OnInit {
    sports: any;
    filterData: any;

    catId;
    typeId;
    searchByHeader;
    eventsList;
    eventsListNotFiltered=[];
    isSaved:boolean=false;

    cityFilter:string = '';
    today:Date = new Date();
    startDateFilter:string | Date = '';
    endDateFilter: Date;
    maxPriceFilter:string=''
    showPassed:boolean = false;



    constructor(public cityService: CityService, private router: Router, public enumsService: EnumsService,
        public eventService: EventService,
        private route:ActivatedRoute,
        private sharedService: SharedService,
        public authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.catId = params.get('catId');
            this.typeId = params.get('typeId');
            this.searchByHeader = params.get('event')
            this.getEventsList();
          });
    }

        getEventsList() {
        if(this.typeId){
            this.getEventsByType();
        }
        else if(this.catId){
            this.getEventsByCategory();
        }
        else{
            this.getAllEvents();
        }
    }

    getEventsByType(){
        this.eventService.getEventsByType(this.typeId).pipe(
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
            res.forEach(event => {
                event.image ='data:image/webp;base64, '+event.image;
           });
              this.eventsList=res;
              this.sharedService.isLoading(false);   
            })
    }

    getEventsByCategory(){
        this.eventService.getEventsByCategory(this.catId).pipe(
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
            res.forEach(event => {
                event.image ='data:image/webp;base64, '+event.image;
           });
            this.eventsList=res;
              this.sharedService.isLoading(false);   
            })

    }

    getAllEvents(){

        if(this.eventService.allEvents.getValue()){
          this.eventsList=this.eventService.allEvents.getValue();
        }
        else {
                  this.eventService.getAllEventsReq().pipe(
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
            res.forEach(event => {
                event.image ='data:image/webp;base64, '+event.image;
           });
            this.eventsList=res;
            this.eventService.allEvents.next(res);
              this.sharedService.isLoading(false);   
            })
        }
        

         if(this.searchByHeader){
          let allEvents = this.eventService.allEvents.getValue();
          this.eventsList = allEvents.filter(x => x.header.toLowerCase().includes(this.searchByHeader.toLowerCase()));
        }

    }

    goToEventDetails(id){
        this.router.navigate(['/event-details/'+id])
    }

    getTypeName(typeId){
        let typesToArray = this.enumsService.types$.getValue();
        return typesToArray.find(x => x.id == typeId)?.type
      }

      getCategoryName(categoryId){
        let categoriesToArray = this.enumsService.categories$.getValue();
        return categoriesToArray.find(x => x.id == categoryId)?.category
    }


    reloadPage(): void {
        window.location.reload();
    }



    filter() {
      if(this.eventsListNotFiltered.length==0){
        this.eventsListNotFiltered = this.eventsList;
      }
      else{
        this.eventsList = this.eventsListNotFiltered;
      }     
        if (this.cityFilter != '') {
          this.eventsList = this.eventsList.filter(e => e.location == this.cityFilter);
        }
      
        if (this.maxPriceFilter != '') {
          this.eventsList = this.eventsList.filter(e => +e.price <= +this.maxPriceFilter);
        }
      
        if (this.startDateFilter) {
          this.eventsList = this.eventsList.filter(e => new Date(e.date) >= new Date(this.startDateFilter));
        }
      
        if (this.endDateFilter) {
          this.eventsList = this.eventsList.filter(e => new Date(e.date) <= new Date(this.endDateFilter));
        }
      }
      

    clearFilters(){
        this.eventsList = this.eventsListNotFiltered;
        this.startDateFilter = new Date();
        this.endDateFilter = undefined;
        this.maxPriceFilter = '';
        this.cityFilter = '';

    }

    showPassedEvents(){
      this.showPassed = !this.showPassed
    }

    getSavedEventsFromUser(){
      return this.eventService.savedEventsUser.getValue();
    }

    removeSavedEvent(event){
        this.eventService.unlikeAndRemoveEvent(event).subscribe();

    }

    saveRemovedEvent(event){
       this.eventService.likeAndSaveEvent(event).subscribe();
    }
}
