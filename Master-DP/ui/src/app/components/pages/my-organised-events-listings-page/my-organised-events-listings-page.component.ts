import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { EventService } from 'src/service/event.service';
import { SharedService } from 'src/service/shared.service';
import { EnumsService } from 'src/service/enums.service';

@Component({
    selector: 'app-my-organised-events-listings-page.',
    templateUrl: './my-organised-events-listings-page.component.html',
    styleUrls: ['./my-organised-events-listings-page.component.scss']
})
export class MyOragisedEventsListingsPageComponent implements OnInit {


    myEventsList;
    eventBanner;
    constructor(public eventsService: EventService, private router:Router, private sharedService: SharedService, private enumsService: EnumsService) {
    }

    ngOnInit(): void {
        this.sharedService.isLoading(true)
        this.eventsService.getEventsByOrganiserId(JSON.parse(window.sessionStorage.getItem('auth-user')).id).subscribe((res:any)=>{
            res.forEach(event => {
                 event.image ='data:image/webp;base64, '+event.image;
            });
            this.myEventsList = res
            this.sharedService.isLoading(false);
            console.log(this.myEventsList)
        })
        
    }

    getTypeName(typeId){
        let typesToArray = this.enumsService.types$.getValue();
        return typesToArray.find(x => x.id == typeId)?.type
      }

    getCategoryName(categoryId){
        let categoriesToArray = this.enumsService.categories$.getValue();
        return categoriesToArray.find(x => x.id == categoryId)?.category
    }

    goToEventDetails(id){
        this.router.navigate(['/event-details/'+id])
    }
}
