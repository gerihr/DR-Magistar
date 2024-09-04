import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface HttpOptions {
    params?: HttpParams;
    headers?: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class TrainerService {
    currentTrainerInfo: any;
    constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {

    }

    createTrainerInfo(header: string, category: string, subcategory: string, city: string, date: string | Date, hour: string, about: string, price: any) {
        let sessionToken = this.storageService.getUser().id;
        console.log(sessionToken);
        return this.http
            .post<any>(`http://localhost:8099/v1/createTrainerInfo/${sessionToken}`,
                { header, category, city, about, subcategory, hour, date, price });
    }
    getTrainerInfoById(userId: number) {
        return this.http
            .get<any>(`http://localhost:8099/v1/getTrainerInfo/${userId}`);
    }

    getAllTrainers() {
        return this.http
            .get<any>(`http://localhost:8099/v1/getTrainerInfos`);
    }

    filterTrainersByCriteria(name: string | null, location?: string | null, category?: string | null, typeOfTraining?: string | null, gender?: string | null, ratingStars?: string | null, minPrice?: number | null, maxPrice?: number | null) {
        let httpOptions: HttpOptions = {};

        if (name != null) {
            const params = new HttpParams().set('name', name);
            httpOptions = { params: params };
        }
        if (location != null) {
            const params = new HttpParams().set('location', location);
            if (httpOptions.hasOwnProperty('params')) {
                const existingParams = httpOptions['params'] as HttpParams;
                httpOptions['params'] = existingParams.append('location', location);
            } else {
                httpOptions = { params: params };
            }
        }
        if (category != null) {
            const params = new HttpParams().set('category', category);
            if (httpOptions.hasOwnProperty('params')) {
                const existingParams = httpOptions['params'] as HttpParams;
                httpOptions['params'] = existingParams.append('category', category);
            } else {
                httpOptions = { params: params };
            }
        }
        if (typeOfTraining != null) {
            const params = new HttpParams().set('typeOfTraining', typeOfTraining);
            if (httpOptions.hasOwnProperty('params')) {
                const existingParams = httpOptions['params'] as HttpParams;
                httpOptions['params'] = existingParams.append('typeOfTraining', typeOfTraining);
            } else {
                httpOptions = { params: params };
            }
        }
        if (gender != null) {
            const params = new HttpParams().set('gender', gender);
            if (httpOptions.hasOwnProperty('params')) {
                const existingParams = httpOptions['params'] as HttpParams;
                httpOptions['params'] = existingParams.append('gender', gender);
            } else {
                httpOptions = { params: params };
            }
        }
        if (ratingStars != null) {
            const params = new HttpParams().set('ratingStars', ratingStars);
            if (httpOptions.hasOwnProperty('params')) {
                const existingParams = httpOptions['params'] as HttpParams;
                httpOptions['params'] = existingParams.append('ratingStars', ratingStars);
            } else {
                httpOptions = { params: params };
            }
        }
        if (minPrice != null) {
            const params = new HttpParams().set('minPrice', minPrice);
            if (httpOptions.hasOwnProperty('params')) {
                const existingParams = httpOptions['params'] as HttpParams;
                httpOptions['params'] = existingParams.append('minPrice', minPrice);
            } else {
                httpOptions = { params: params };
            }
        }
        if (maxPrice != null) {
            const params = new HttpParams().set('maxPrice', maxPrice);
            if (httpOptions.hasOwnProperty('params')) {
                const existingParams = httpOptions['params'] as HttpParams;
                httpOptions['params'] = existingParams.append('maxPrice', maxPrice);
            } else {
                httpOptions = { params: params };
            }
        }
        return this.http
            .get<any>(`http://localhost:8099/v1/filter`, httpOptions);
    }

    sendReview(review: any, rating: any, userId: number) {
        return this.http.post(`http://localhost:8099/v1/createRating/${userId}`, {
                review,
                rating
            },
            httpOptions);
    }
}
