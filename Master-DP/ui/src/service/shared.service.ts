import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class SharedService {
  constructor(private toastrService: ToastrService){}

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this.loading.asObservable();

  isLoading(bool:boolean){
    this.loading.next(bool)
  }

  successMessage(text: string){
    this.toastrService.success(text)
  }

  errorMessage(text:string){
    this.toastrService.error(text)
  }

}