import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {
  }

API_URL = 'http://localhost:8099/v1';

    getCoordinates(address:string) {
        return this.http.get(`${this.API_URL}/get-coordinates/${address}`)
            .pipe(map(response => {
                if (response) {
                    return response;
                }
                return [];
            }));
    }
}
