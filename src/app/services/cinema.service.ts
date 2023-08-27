import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject  } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { Movie, Show, Seat } from './../models/index';

@Injectable({ providedIn: 'root' })
export class CinemaService {

  movieName: string = 'Movie';
  private movies: Movie[] = [];
  private shows: Show[] = [];

  //Subjects
  selectedMovieSubject = new BehaviorSubject<Movie>({});
  selectedShowSubject = new ReplaySubject<Show>();
  selectedSeatSubject = new ReplaySubject<Seat>();
  
  //As observables
  selectedMovie$: Observable<Movie> = this.selectedMovieSubject.asObservable();
  selectedShow$: Observable<Show> = this.selectedShowSubject.asObservable();
  selectedSeat$: Observable<Seat> = this.selectedSeatSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllMovies(): Movie[] {
    if (this.movies && this.movies.length > 0) {
      return this.movies.slice();
    } else {
      this.getAvailableMoviesList();
      return this.movies;
    }
  }

  getAvailableMoviesList(): void {
    this.http
      .get<Movie[]>(`${environment.apiUrl}/${ApiPaths.Movies}`)
      .subscribe({
        next: (movies: Movie[]) => {
          console.log('movies get from api success')
          movies.forEach((movie) => this.movies.push(movie));
        },
        error: (error) => console.log(error),
      });
  }

  getMovieInfo(movie: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${environment.apiUrl}/${ApiPaths.Movies}/${movie}/info`
    );
  }

  getAllShowsForMovie(movie: string): Show[] {
    if (this.movieName === movie && this.shows.length > 0) {
      return this.shows.slice();
    } else {
      this.shows = [];
    }
    
    this.http
      .get<Show[]>(`${environment.apiUrl}/${movie}/shows`)
      .subscribe({
        next: (shows: Show[]) => {
          shows.forEach((show) => this.shows.push(show));
        },
        error: (error) => console.log(error),
      });
    return this.shows;
  }

  getAllSeatsForMovie(
    movie: string,
    date: string,
    time: string
  ): Observable<Seat> {
    return this.http.get<Seat>(`${environment.apiUrl}/${movie}/seats/${date}/${time}`);
  }
}
