import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { CinemaService, AuthenticationService } from './../../services/index';
import { Movie } from './../../models/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.scss']
})
export class CinemaMoviesComponent implements OnInit, OnDestroy {
  
  movies: Movie[] = [];

  private destroy$ = new Subject<void>(); // Subject for unsubscribing

  constructor(private cinemaService: CinemaService, 
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.movies = this.cinemaService.getAllMovies();
    
  }

  onMovieInfo(movieId: number | undefined) {

    //if user is not logged in
    if (this.authenticationService.userValue === undefined) {
      console.log("Not logged in");
      this.router.navigate(['/auth/login']);
    }

    let movieInfo: Movie | undefined;

    if (this.movies.length > 0) {
      movieInfo = this.movies.filter((m) => m.id === movieId)[0];
    }

    if (movieInfo !== undefined) {
      this.goToMovieCard(movieInfo);
    }

    if (movieId) {
      this.cinemaService.getMovieInfo(movieId.toLocaleString())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (movieInfo) => {
          this.goToMovieCard(movieInfo);
        },
        error: (error) => console.log(error),
      });
    }
  }

  goToMovieCard(movieInfo: Movie): void {
    this.cinemaService.selectedMovie$
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      movie => {
        if (movie !== movieInfo) {
          //store movie only if different from previous one
          this.cinemaService.selectedMovieSubject.next(movieInfo);
        }
      }
    );
    this.router.navigate(['/cinema/movie-card']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
