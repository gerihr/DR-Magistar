import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CityService} from "../../../../service/city.service";
import {Router} from "@angular/router";
import { EMPTY, catchError, delay, of, tap } from 'rxjs';
import { EventService } from 'src/service/event.service';
import { EnumsService } from 'src/service/enums.service';
import { RecommendationsService } from 'src/service/recommendations.service';
import * as brain from 'brain.js';


@Component({
    selector: 'app-my-events-listings-page.',
    templateUrl: './my-events-listings-page.component.html',
    styleUrls: ['./my-events-listings-page.component.scss']
})
export class MyEventsListingsPageComponent implements OnInit, AfterViewInit {
    cities: any;
    sports: any;
    trainersData: any;
    filterData: any;
    isSaved=false;
    eventsList: any;

    constructor(public cityService: CityService, public recService: RecommendationsService , private router: Router, public eventService: EventService, public enumsService:EnumsService) {
    }

    ngOnInit(): void {
        this.getSavedEvents();
    }


    getSavedEvents(){
        // this.eventService.getAllEvents().pipe(
        //     delay(0),
        //     catchError(err => {
        //       if(err.status !== 200){
        //         return EMPTY
        //       }
        //       else{
        //         return of(err);
        //       }
              
        //     })
        //   ).subscribe((res:any )=>{
        //     res.forEach(event => {
        //         event.image ='data:image/webp;base64, '+event.image;
        //    });
        //     this.eventsList=res;
        //     })

        
    }

    ngAfterViewInit(): void {
        // this.getSavedEvents();
        //this.recService.getRecForUser();
        // let allEvents = this.eventService.allEvents.getValue();

        // const net = new brain.NeuralNetwork();
        // const trainingData = this.recService.prepareTrainingData();
        // net.train(trainingData);
        // let recommendations = this.recService.getRecommendations(net, allEvents, 3);
        // console.log(recommendations)
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

    removeSavedEvent(event){
        this.eventService.unlikeAndRemoveEvent(event).subscribe();

    }

    saveRemovedEvent(event){
       this.eventService.likeAndSaveEvent(event).subscribe();
    }

    goToEventDetails(id){
        this.router.navigate(['/event-details/'+id])
    }
}
