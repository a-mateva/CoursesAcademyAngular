import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import RatingInterface from '../models/rating.model';

@Injectable({
    providedIn: 'root'
})

export class RatingsService {

    constructor(private http: HttpClient) {

    }

    getAllRatings(): Observable<RatingInterface[]> {
        return this.http.get<RatingInterface[]>('http://localhost:3000/ratings');
    }

}