import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Editor, Toolbar} from 'ngx-editor';
import {CityService} from "../../../../service/city.service";
import {AsyncSubject, catchError, delay, EMPTY, empty, map, Observable, of, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {StorageService} from "../../../../service/storage.service";
import {FileUploadService} from "../../../../service/file-upload.service";
import { EventService } from '../../../../service/event.service';
import { EnumsService } from '../../../../service/enums.service';
import { AuthService } from '../../../../service/auth.service';
import { SharedService } from '../../../../service/shared.service';


@Component({
    selector: 'app-post-a-event-page',
    templateUrl: './event-info-page.component.html',
    styleUrls: ['./event-info-page.component.scss']
})
export class EventInfoPageComponent implements OnInit, OnDestroy, AfterViewInit {

    editor: any;
    html: any;
    cities: any;
    sports: any;
    category: any;
    typeOfTraining: any;
    city: any;
    gender: any;
    formData: any;
    showError: any;
    clickedButton:any = false
    clickedButtonToPayment:any = false
    currentUser: any;
    imageInfos?: Observable<any>;
    selected: Date = new Date();
    minDate: Date = new Date();
    calendarShowed:boolean = false;
    hourPickerShowed:boolean = false;
    currentImage;
    selectedTypeName;
    placesList;


    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
    categories$: any;
    types$: any;
    eventId;

    constructor(
                private router: Router,
                private formBuilder: FormBuilder,
                public eventService: EventService,
                public enumsService :EnumsService,
                private authService: AuthService,
                private route: ActivatedRoute,
                private cityService:CityService,
                public fileUploadService: FileUploadService,
                private sharedService: SharedService,
                public storageService: StorageService, public uploadService: FileUploadService) {
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe((params) => {
            this.eventId = params.get('id');
          });

        this.currentUser = this.storageService.getUser();
        this.editor = new Editor();
        this.categories$ = this.enumsService.getCategories();
        this.cities = this.enumsService.getCities();
        this.types$ = this.enumsService.getTypes();
        this.formData = new FormGroup({
            header: new FormControl(''),
            category: new FormControl(''),
            type: new FormControl(''),
            location: new FormControl(''),
            date: new FormControl(''),
            time: new FormControl(null),
            price: new FormControl(''),
            description: new FormControl(''),
            image: new FormControl (''),
            organiserId: new FormControl (JSON.parse(window.sessionStorage.getItem('auth-user')).id),
            address: new FormControl(''),
            longitude: new FormControl(''),
            latitude: new FormControl(''),
            ticketsInStock: new FormControl
        });
        this.showError=false;
    }

    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }

    nextButton(){
       this.clickedButton = true;
    }

    goBackToEdit(){
        this.clickedButton = false;
    }

    ngAfterViewInit(){
        if(this.eventId){
            
            this.eventService.getEventDetailsById(this.eventId).pipe(
              delay(0),
              tap(()=> this.sharedService.isLoading(true)),
              catchError(err => {
                if(err.status !== 200){
                  return EMPTY
                }
                else{
                  return of(err);
                }
                
              })
            ).subscribe((res:any )=>{
                this.formData.patchValue(res);
                this.currentImage = 'data:image/webp;base64,'+res.image;
                this.formData.patchValue({ image:this.currentImage.split(',')[1] });
                this.sharedService.isLoading(false)


              })
              
        }
    }



  chosenDate($event){
    this.formData.controls.date.setValue($event)
  }

  showHideCal(){
    this.calendarShowed = !this.calendarShowed
  }

  showHideHourPicker(){
    this.formData.controls.time.setValue('')
  }

  getFilteredTypes(){
    if(this.formData.controls.category.value!==''){
        let allCategories = this.enumsService.categories$.getValue();
        return allCategories.find(x => x.id == this.formData.controls.category.value).typeList;
    }
    return []
  }

  getCoordinates(){
    this.cityService.getCoordinates(this.formData.controls.address.value)
    .pipe(
      delay(0),
      tap(()=> this.sharedService.isLoading(true)))
    .subscribe((res:any)=>{
      this.placesList=res.features.filter(x=>x.properties.country=="Bulgaria");
      this.sharedService.isLoading(false)

    }
    );
  }

  setCoordinates(address){
    this.formData.controls.longitude.setValue(address.geometry.coordinates[0]);
    this.formData.controls.latitude.setValue(address.geometry.coordinates[1]);
  }


  setCurrentImage($event){
    this.currentImage = $event;
    this.formData.patchValue({ image: $event.split(',')[1] });

  }

  selectedType(){
   let typesToArray = this.enumsService.types$.getValue();
   return typesToArray.find(x => x.id == this.formData.controls.type.value)?.type
  }

createEvent() {
    this.eventService.createNewEvent(
        this.formData
    )
    .pipe(
        catchError(err => {
            if(err.status !== 200){
            this.showError = true
            return EMPTY;
            }
            else {
              this.sharedService.errorMessage(err.error)
                return of(err)
            }
        })
    )
    .subscribe(res => 
        {
            if(res.body){
                this.sharedService.successMessage("Успешно добавихте събитие")
                this.router.navigate(['/event-details/'+res.body])
            }
        }
    );
}

updateEventData(){
    this.eventService.updateEvent(
        this.eventId, this.formData
    )
    .pipe(
        catchError(err => {
            if(err.status !== 200 && err.status!==undefined){
            this.showError = true
            return EMPTY;
            }
            else {
                this.sharedService.errorMessage(err.error)
                return of(err)
            }
        })
    )
    .subscribe(res => 
        {
          this.sharedService.successMessage("Успешно записахте промените")
          this.router.navigate(['/event-details/'+this.eventId])
        }
    );
}

continue(){
    if(this.eventId){
        this.updateEventData()
    }
    else{
        this.createEvent()
    }

}

}
