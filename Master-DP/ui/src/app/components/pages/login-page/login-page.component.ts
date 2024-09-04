import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, delay, empty, of, tap} from 'rxjs';
import {AuthService} from "../../../../service/auth.service";
import {StorageService} from "../../../../service/storage.service";
import {AppComponent} from "../../../app.component";
import { EventService } from 'src/service/event.service';
import { SharedService } from 'src/service/shared.service';
import * as CryptoJS from 'crypto-js';
import { passwordValidator } from 'src/validators/password.validator';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    formData: any;
    showError: any;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    get email() { return this.formData.get('email'); }

    get password() { return this.formData.get('password'); }

    form: any = {
        email: null,
        password: null
    };

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private eventService: EventService,
        private storageService: StorageService,
        private sharedService: SharedService,
        public component: AppComponent) { }

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            email: new FormControl(''),
            password: new FormControl(''),
        });

        this.showError=false;
    }

    toProfile(){
        this.authService.login(this.formData.controls.email.value, this.hashPassword(this.formData.controls.password.value))
        .pipe(
            delay(0),
            tap(()=> this.sharedService.isLoading(true)))
            .subscribe({
            next: data => {
                this.authService.saveUser(data);
                this.authService.setIsOrganiser(data.type == 'organiser' ? true : false )
                this.authService.saveToken(data.sessionToken);
                this.isLoginFailed = false;
                this.roles = this.storageService.getUser().roles;
                if(data.type == 'user'){
                    this.eventService.getSavedEventsForUser();
                }
                this.sharedService.isLoading(false);
                this.router.navigateByUrl('/')
            },
            error: err => {
                this.errorMessage = err.error;
                this.sharedService.errorMessage(err.error)
                this.sharedService.isLoading(false);
                this.isLoginFailed = true;
            }
        }
        );
    };

    reloadPage(): void {
        window.location.reload();
    }

    hashPassword(password: string): string {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        return hashedPassword;
      }


}
