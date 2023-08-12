import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { CinemaService } from './../../services/index';
import { Movie } from './../../models/index';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'cinema-movies',
  templateUrl: './cinema-movies.component.html',
})
export class CinemaMoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];

  constructor(private cinemaService: CinemaService, private router: Router) {}

  ngOnInit() {
    this.movies = this.cinemaService.getAllMovies();
  }

  ngOnChanges() {}

  onMovieInfo(movieName: string | undefined) {
    let movieInfo: Movie | undefined;
    if (this.movies.length > 0) {
      movieInfo = this.movies.filter((m) => m.title === movieName).at(0);
    }

    if (movieInfo !== undefined) {
      this.goToMovieInfo(movieInfo);
    }

    if (movieName !== undefined) {
      this.cinemaService.getMovieInfo(movieName).subscribe({
        next: (movieInfo) => {
          this.goToMovieInfo(movieInfo);
        },
        error: (error) => console.log(error),
      });
    }
  }

  goToMovieInfo(movieInfo: Movie): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        movie: movieInfo,
      },
      skipLocationChange: true,
    };
    this.router.navigate(['movie-info'], navigationExtras);
  }

  ngOnDestroy(): void {}
}
