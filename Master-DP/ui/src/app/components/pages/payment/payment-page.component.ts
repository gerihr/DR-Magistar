import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, delay, EMPTY, of, tap } from 'rxjs';
import { TicketService } from '../../../../service/ticket.service';
import { SharedService } from '../../../../service/shared.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  constructor(private ticketService: TicketService, private sharedService: SharedService) { }
  paymentForm;
  paymentSuccessful:boolean = false;

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      cardHolderName: new FormControl ("", [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      cvv: new FormControl ("", {validators:[Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
      expDate: new FormControl ("", Validators.required),
      creditCard: new FormControl ("",  {validators:[Validators.required, Validators.minLength(16), Validators.maxLength(16)]})
  });
  }


  checkValidExpDate(){
    const expiration = this.paymentForm.get('expDate').value
      const [expMonth, expYear] = expiration.split('/').map(Number); 
  
      const today = new Date(); 
      const currentMonth = today.getMonth() + 1; 
      const currentYear = today.getFullYear() % 100; 
      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
          return false;
      }
        return true;
  }

  pay(){
    if(this.paymentForm.valid && this.checkValidExpDate()){
      this.sharedService.isLoading(true)
      this.ticketService.payment().pipe(
        catchError(err => {
          if(err.status !== 200){
            this.sharedService.errorMessage(err.error)
            this.sharedService.isLoading(false)
            return EMPTY
          }
          else{
            this.sharedService.errorMessage(err.error)
            this.sharedService.isLoading(false)
            return of(err);
          }
          
        })
      ).subscribe(res=>{
        this.sharedService.successMessage(res.message)
        this.sharedService.isLoading(false)
        this.paymentSuccessful=true
        
      });
    }
    else {
      this.sharedService.errorMessage('Невалидни данни. Моля, въведете коректни данни')
    }
  }


}
