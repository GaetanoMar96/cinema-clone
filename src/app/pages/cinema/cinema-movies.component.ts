import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { CinemaService } from './../../services/index';
import { Movie } from './../../models/index';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.scss']
})
export class CinemaMoviesComponent implements OnInit, OnDestroy {
  
  movies: Movie[] = [];

  constructor(private cinemaService: CinemaService, 
    private router: Router) {}

  ngOnInit() {
    this.movies = this.cinemaService.getAllMovies();
  }

  onMovieInfo(movieName: string | undefined) {
    let movieInfo: Movie | undefined;

    if (this.movies.length > 0) {
      movieInfo = this.movies.filter((m) => m.title === movieName)[0];
    }

    if (movieInfo !== undefined) {
      this.goToMovieCard(movieInfo);
    }

    if (movieName !== undefined) {
      this.cinemaService.getMovieInfo(movieName).subscribe({
        next: (movieInfo) => {
          this.goToMovieCard(movieInfo);
        },
        error: (error) => console.log(error),
      });
    }
  }

  goToMovieCard(movieInfo: Movie): void {
    this.cinemaService.selectedMovie$.subscribe(
      movie => {
        if (movie !== movieInfo) {
          //store movie only if different from previous one
          this.cinemaService.selectedMovieSubject.next(movieInfo);
        }
      }
    );
    this.router.navigate(['/cinema/movie-card']);
  }

  ngOnDestroy(): void {}
}
