import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject  } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { Movie, Show, Seat, MovieDetail } from './../models/index';

@Injectable({ providedIn: 'root' })
export class CinemaService {

  movieName: string = 'Movie';
  private movies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  private shows: Show[] = [];

  //Subjects
  selectedMovieSubject = new BehaviorSubject<MovieDetail>({});
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
      console.log("no http for movies")
      return this.movies.slice();
    } else {
      console.log("http for movies")
      this.getAvailableMoviesList();
      console.log(this.movies)
      return this.movies;
    }
  }

  getAvailableMoviesList(): void {
    this.http
      .get<Movie[]>(`${environment.apiUrl}/${ApiPaths.Movies}/now_playing`)
      .subscribe({
        next: (movies: Movie[]) => {
          console.log('movies get from api success');
          movies.forEach((movie) => this.movies.push(movie));
        },
        error: (error) => console.log(error),
      });
  }

  getMovieInfo(movieId: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${environment.apiUrl}/${ApiPaths.Movies}/movie/${movieId}`
    );
  }

  getUpcomingMovies(): void {
    this.http
      .get<Movie[]>(`${environment.apiUrl}/${ApiPaths.Movies}/upcoming`)
      .subscribe({
        next: (movies: Movie[]) => {
          console.log('movies get from api success');
          movies.forEach((movie) => this.upcomingMovies.push(movie));
        },
        error: (error) => console.log(error),
      });
  }

  getAllShowsForMovie(movie: string): Show[] {
    if (this.movieName === movie && this.shows.length > 0) {
      return this.shows.slice();
    } else {
      this.shows = [];
    }
    
    this.http
      .get<Show[]>(`${environment.apiUrl}/${ApiPaths.Theaters}/${movie}/shows`)
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
    return this.http.get<Seat>(`${environment.apiUrl}/${ApiPaths.Theaters}/${movie}/seats/${date}/${time}`);
  }
}
