import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject  } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { ApiPaths } from './../helpers/api-paths';
import { Movie, Show, Seat, MovieDetail } from './../models/index';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class CinemaService {

  movieName: string = 'Movie';
  upcomingMovies: Movie[] = [];

  //Subjects
  selectedMovieSubject = new BehaviorSubject<MovieDetail>({});
  selectedShowSubject = new ReplaySubject<Show>();
  selectedSeatSubject = new ReplaySubject<Seat>();
  
  //As observables
  selectedMovie$: Observable<Movie> = this.selectedMovieSubject.asObservable();
  selectedShow$: Observable<Show> = this.selectedShowSubject.asObservable();
  selectedSeat$: Observable<Seat> = this.selectedSeatSubject.asObservable();

  private moviesCollection: AngularFirestoreCollection<Movie>;

  constructor(private http: HttpClient,
    private angularFirestore: AngularFirestore) {
    this.moviesCollection = this.angularFirestore.collection<Movie>('movies');

  }

  getAvailableMovies(): Observable<Movie[]> {
    return this.moviesCollection.snapshotChanges()
        .pipe(
          first(),
          map(actions => actions.map(a => a.payload.doc.data() as Movie))
        );
    
  }

  getMovieInfo(movieId: string): Observable<MovieDetail> {
    return this.http.get(`${environment.apiUrl}/${movieId}`)
    .pipe(
      map((data: any) => {
        return {
          id: data.id,
          title: data.title,
          overview: data.overview,
          release_date: data.release_date,
          vote_average: data.vote_average,
          poster_path: data.poster_path
        } as MovieDetail;
      })
    );
  }

  getUpcomingMovies(): void {
    //implement call to movie db api
    /*this.http
      .get<Movie[]>(`${environment.apiUrl}/${ApiPaths.Movies}/upcoming`)
      .subscribe({
        next: (movies: Movie[]) => {
          console.log('movies get from api success');
          movies.forEach((movie) => this.upcomingMovies.push(movie));
        },
        error: (error) => console.log(error),
      });*/
  }

  getAllShowsForMovie(movieId: number): Observable<Show[]> {
    return this.angularFirestore.collection<Show>(
      'shows', (ref) => ref.where('movieId', '==', movieId)
    ).valueChanges();
  }

  getAllSeatsForMovie(
    movieId: number,
    date: string,
    time: string
  ): Observable<Seat[]> {
    return this.angularFirestore.collection<Seat>(
      'hall', (ref) => ref.where('movieId', '==', movieId)
    ).valueChanges();
  }
}
