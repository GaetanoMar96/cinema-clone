import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { CinemaService, AuthenticationService } from './../../services/index';
import { Movie, MovieDetail } from './../../models/index';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.scss']
})
export class CinemaMoviesComponent implements OnInit, OnDestroy {
  
  movies: Movie[] = [];

  private moviesSubscription = new Subscription();

  constructor(private cinemaService: CinemaService, 
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.moviesSubscription = this.cinemaService.getAvailableMovies().subscribe(
      (movies: Movie[]) => this.movies = movies
    );
  }

  onMovieInfo(movieId: number | undefined) {
    if (movieId) {
      this.cinemaService.getMovieInfo(movieId)
      .subscribe({
        next: (movieInfo) => {
          this.goToMovieCard(movieInfo);
        },
        error: (error) => console.log(error),
      });
    }
  }

  goToMovieCard(movieInfo: Movie): void {
    this.cinemaService.selectedMovieSubject.next(movieInfo);
    this.router.navigate(['/cinema/movie-card']);
  }

  ngOnDestroy(): void {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }
}
