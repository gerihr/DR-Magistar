import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, EMPTY, Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from './shared.service';

const API_URL = 'http://localhost:8099/v1';

@Injectable({
    providedIn: 'root',
})
export class TicketService {

  ticketNumber: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  eventId: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, private http: HttpClient, private sharedService: SharedService) {}

    buyTickets(eventId, ticketNumber){
      let checkTicketForm = {
        event_id: eventId,
        user_id: this.authService.getUserId(),
        ticketNumber: ticketNumber
      }

      this.ticketNumber.next(ticketNumber);
      this.eventId.next(eventId);
 
      return this.http.post(`${API_URL}/check-ticket`, checkTicketForm)
      // запазване на стойността и проверка дали съществуват
    }

    payment(){

      let buyTicketForm = {
        event_id: this.eventId.getValue(),
        user_id: this.authService.getUserId(),
        ticketNumber: this.ticketNumber.getValue()
      }
      return this.http.put(`${API_URL}/buy-ticket`, buyTicketForm)
    }

    getTicketList(eventId){
      let params = new HttpParams().set('event_id', eventId.toString());

      return this.http.get(`${API_URL}/tickets/byEvent`, { params })
    }

}