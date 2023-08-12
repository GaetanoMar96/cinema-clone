import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { Movie, Show, Seat } from "./../models/index";

@Injectable({ providedIn: 'root' })
export class CinemaService {
    
    private movieName: string;
    private movies: Movie[] = [];
    private shows: Show[] = [];

    constructor(
        private router: Router,
        private http: HttpClient) {
        
    }

    getAllMovies(): Movie[] {
        if (this.movies && this.movies.length > 0) {
            return this.movies.slice();
        }
        this.getAvailableMoviesList();
        return this.movies;
    }

    getAvailableMoviesList(): void {
        this.http.get(`${environment.apiUrl}/${ApiPaths.Movies}`)
        .forEach(movie => this.movies.push(movie));
    }

    getMovieInfo(movie: string): Observable<Movie> {
        return this.http.get(`${environment.apiUrl}/${ApiPaths.Movies}/movie/info`, 
                    { params: {'movie': movie}});
    }

    getAllShowsForMovie(movie: string): Show[] {
        if (this.movieName === movie && this.shows.length > 0) {
            return this.shows.slice();
        } else {
            this.shows = [];
        }

        this.http.get(`${environment.apiUrl}/movie/shows`, 
                    { params: {'movie': movie}})
                    .forEach(show => this.shows.push(show))
        return this.shows.slice();
    }

    getAllSeatsForMovie(movie: string, date: string, time: string): Observable<Seat> {
        return this.http.get(`${environment.apiUrl}/movie/seats/date/time`, 
                    { params: {'movie': movie, 'date': date, 'time': time}});
    }

}