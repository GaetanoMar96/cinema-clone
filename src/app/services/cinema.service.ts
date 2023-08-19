import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { Movie, Show, Seat } from './../models/index';

@Injectable({ providedIn: 'root' })
export class CinemaService {

  private movieName: string;
  private movies: Movie[] = [];
  private shows: Show[] = [];

  movie = new BehaviorSubject<Movie>({});
  show = new BehaviorSubject<Show>({});
  seat = new BehaviorSubject<Seat>({});
  
  constructor(private router: Router, private http: HttpClient) {
  }

  getAllMovies(): Movie[] {
    if (this.movies && this.movies.length > 0) {
      return this.movies.slice();
    }
    this.getAvailableMoviesList();
    return this.movies;
  }

  getAvailableMoviesList(): void {
    this.http
      .get<Movie[]>(`${environment.apiUrl}/${ApiPaths.Movies}`)
      .subscribe({
        next: (movies: Movie[]) => {
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
      console.log('no http for show')
      return this.shows.slice();
    } else {
      this.shows = [];
    }
    console.log('recupero show')
    this.http
      .get<Show[]>(`${environment.apiUrl}/${movie}/shows`)
      .subscribe({
        next: (shows: Show[]) => {
          console.log(shows)
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
    this.show.next({startDate: date, startTime: time});
    return this.http.get<Seat>(`${environment.apiUrl}/${movie}/seats/${date}/${time}`);
  }
}
