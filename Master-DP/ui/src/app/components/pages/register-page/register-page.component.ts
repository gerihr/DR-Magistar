import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { delay, empty, tap} from 'rxjs';
import {AuthService} from "../../../../service/auth.service";
import { EnumsService } from 'src/service/enums.service';
import { SharedService } from 'src/service/shared.service';
import * as CryptoJS from 'crypto-js';
import { passwordValidator } from 'src/validators/password.validator';

@Component({
    selector: 'register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

    formData: any;
    showError: any;
    isSuccessful = false;
    isSignUpFailed = false;
    typeOfProfile = false;
    loginError: any;
    cities:any

    get email() {
        return this.formData.get('email');
    }

    get password() {
        return this.formData.get('password');
    }

    get firstName() {
        return this.formData.get('firstName');
    }

    get lastName() {
        return this.formData.get('lastName');
    }

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public enumsService: EnumsService,
        private sharedService: SharedService,
        public authService: AuthService) {
    }

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, passwordValidator()]),
            city: new FormControl(null, [Validators.required]),
            type: new FormControl(null,  [Validators.required])
        });

        this.showError = false;
    }

    toProfile() {
        if(!this.formData.valid){
            if(!this.formData.controls.password.valid){
                this.sharedService.errorMessage("Паролата не отговаря на изискванията");
            }
            else{
                this.sharedService.errorMessage("Данните не са валидни. Моля, коригирайте данните");
            }
        }
        else {
            this.formData.controls.password.setValue(this.hashPassword(this.formData.controls.password.value));
            this.authService.registration(this.formData.value)
            .pipe(
                delay(0),
                tap(()=> this.sharedService.isLoading(true)))
                .subscribe({
                    next: data => {
                        this.isSuccessful = true;
                        this.isSignUpFailed = false;
                        this.sharedService.isLoading(false);
                        this.sharedService.successMessage("Успешна регистрация")
                        this.router.navigateByUrl('/login')
                    },
                    error: err => {
                        this.loginError = err.error;
                        this.sharedService.errorMessage(this.loginError)
                        this.showError = true
                        this.isSignUpFailed = true;
                        return empty();
                    }
                }
            )
        }
    };

    reloadPage(): void {
        window.location.reload();
    }

    hashPassword(password: string): string {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        return hashedPassword;
      }

}
