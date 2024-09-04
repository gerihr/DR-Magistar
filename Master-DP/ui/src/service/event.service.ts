import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, catchError, delay, EMPTY, Observable, of, tap } from 'rxjs';
import { Cities } from './bulgarian-towns';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

const API_URL = 'http://localhost:8099/v1';

@Injectable({
    providedIn: 'root',
})
export class EventService {

   savedEventsUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   allEvents: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    constructor(private http: HttpClient, public cities: Cities, public authService: AuthService, private sharedService: SharedService) {}

  createNewEvent(eventDetails:any) {
    const req = new HttpRequest('POST', `${API_URL}/new-event`, eventDetails.value);
    return this.http.request(req);
  }

  getAllEventsReq(){
    return this.http.get(`${API_URL}/events`)
  }

  getAllEvents(){
     this.http.get(`${API_URL}/events`).pipe(
      delay(0),
      tap(()=> this.sharedService.isLoading(true)),
      catchError(err => {
        if(err.status !== 200){
          this.sharedService.isLoading(false);
          return EMPTY
        }
        else{
          return of(err);
        }
        
      })
    ).subscribe((res:any )=>{
      res.forEach(event => {
          event.image ='data:image/webp;base64, '+event.image;
     });
      this.allEvents.next(res);
        this.sharedService.isLoading(false);   
      })
  }

  getEventsByType(typeId){
    return this.http.get(`${API_URL}/event/get-by-type/`+typeId);
  }

  getEventsByCategory(categoryId){
    return this.http.get(`${API_URL}/event/get-by-category/`+categoryId);
  }

  getEventsByOrganiserId(id){
    return this.http.get(`${API_URL}/event/get-by-organiser/`+id);
  }

  getEventDetailsById(eventId){
    return this.http.get(`${API_URL}/event/`+eventId);
  }

  updateEvent(eventId, eventData){
    return this.http.put(`${API_URL}/update-event/`+eventId, eventData.value );
  }

  deleteEvent(eventId){
    return this.http.delete(`${API_URL}/event/delete/`+eventId);
  }

  likeAndSaveEvent(event){
    let eventBody={
      "userId": this.authService.getUserId(),
      "eventId": event.id
    }

   let eventArray = this.savedEventsUser.getValue() || [];
   eventArray.push(event);
   this.changeSavedEvents(eventArray);

    return this.http.post(`${API_URL}/save-event`, eventBody,{ responseType: 'text' });

  }

  unlikeAndRemoveEvent(event){
    let eventId = event.id

    let eventArray = this.savedEventsUser.getValue();
    eventArray = eventArray.filter(e => e.id!==eventId);
    this.changeSavedEvents(eventArray);

    return this.http.delete(`${API_URL}/remove-event?eventId=`+eventId+`&userId=`+this.authService.getUserId(), { responseType: 'text' });
    
  }

  getSavedEventsForUser(){
   this.http.get(`${API_URL}/get-saved-events/user-id/`+this.authService.getUserId())
   .pipe(delay(0),
    tap(()=> this.sharedService.isLoading(true)))
    .subscribe((res:any) => {
      res.forEach(event => {event.image ='data:image/webp;base64, '+event.image})
      this.changeSavedEvents(res)
      this.sharedService.isLoading(false)
   })
  }

  changeSavedEvents(list){
    this.savedEventsUser.next(list)
  }

  isEventSaved(id){
    let eventArray = this.savedEventsUser.getValue();
    if(eventArray){
      let isSaved = eventArray.find(x=> x.id == id);
      return isSaved ? true : false
    }
    else 
    return false

  }

  addComment(comment:string, eventId: string | number){
    let commentBody = {
      "id": this.authService.getUserId(),
      "userName": this.authService.getUser().name,
      "comment" : comment
    }
    return this.http.put(`${API_URL}/add-comment/`+eventId, commentBody,{ responseType: 'text' });
  }

}
