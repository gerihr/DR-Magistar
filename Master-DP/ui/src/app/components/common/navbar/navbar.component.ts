import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {StorageService} from "../../../../service/storage.service";
import {EnumsService} from "../../../../service/enums.service";
import { EMPTY, catchError, of, tap } from 'rxjs';
import { SharedService } from 'src/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/service/event.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    currentUser: any;
    categories$;

    constructor(public authService: AuthService,
        public storageService: StorageService,
        public enumsService :EnumsService,
        private sharedService :SharedService,
        public eventsService: EventService
    ) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();

    }

    switcherClassApplied = false;

    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

    searchClassApplied = false;

    searchToggleClass() {
        this.searchClassApplied = !this.searchClassApplied;
    }

    classApplied = false;

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    logout(): void {
        this.authService.logout()
        .pipe(
            tap(() => this.sharedService.isLoading(true)),
            catchError(err => {
                if(err.status !== 200){
                return EMPTY;
                }
                else {
                    return of(err)
                }
            })
        )
        .subscribe(res=>{
            this.sharedService.isLoading(false)
            this.authService.signOut();
        }
        );
    }


}