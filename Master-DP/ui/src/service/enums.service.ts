import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cities } from './bulgarian-towns';

const API_URL = 'http://localhost:8099/v1/';

@Injectable({
    providedIn: 'root',
})
export class EnumsService {

  categories$ = new BehaviorSubject(null);
  types$ = new BehaviorSubject(null);

  constructor(private http: HttpClient, public cities: Cities) {}

  getCategories() {
     this.http.get(API_URL + 'categories').subscribe((res:any) => this.categories$.next(res));
  }

  getTypes() {
    return this.http.get(API_URL + 'types').subscribe((res:any) => this.types$.next(res));
  }

  getCities(){
    return this.cities.cities;
  }

  initEnums(){
    this.getCategories();
    this.getTypes();
  }



}

