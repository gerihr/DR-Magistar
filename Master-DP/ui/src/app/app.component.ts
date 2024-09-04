import { Component } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import {StorageService} from "../service/storage.service";
import { EnumsService } from 'src/service/enums.service';
import { SharedService } from 'src/service/shared.service';
import { AuthService } from 'src/service/auth.service';
import { EventService } from 'src/service/event.service';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent {

    location: any;
    routerSubscription: any;


    private roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;

    constructor(private router: Router, private storageService: StorageService, private enumsService: EnumsService, private eventService: EventService,
         public sharedService: SharedService, private authService: AuthService) {}

    ngOnInit(){
        // this.recallJsFuntions();
        this.isLoggedIn = this.storageService.isLoggedIn();
        this.authService.setLogedIn(this.isLoggedIn)
        this.enumsService.initEnums();

        if (this.isLoggedIn) {
            const user = this.storageService.getUser();
            this.roles = user.type;
            this.authService.setIsOrganiser( user.type=='organiser' ? true : false) 
            if(user.type == 'user'){
                this.eventService.getSavedEventsForUser();
                
            }
            this.showAdminBoard = this.roles.includes('organiser');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            this.username = user.username;
        }
    }
    
}