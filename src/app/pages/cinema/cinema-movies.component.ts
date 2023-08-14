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
    //this.movies = this.cinemaService.getAllMovies();
    this.movies = [{
      title: 'title',
      genre: 'genre',
      year: 'year',
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg'
    }, {
      title: 'No Country for Old Men',
      genre: 'genre',
      year: 'year',
      runtime: '122 min',
      rated: 'PG 18',
      plot: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg'
    }]
  }

  ngOnChanges() {}

  onMovieInfo(movieName: string | undefined) {
    let movieInfo: Movie | undefined;

    if (this.movies.length > 0) {
      movieInfo = this.movies.filter((m) => m.title == movieName)[0];
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

    this.cinemaService.movie.next(movieInfo);
    
    /*let navigationExtras: NavigationExtras = {
      queryParams: {
        movie: movieInfo,
      },
      skipLocationChange: true,
    };*/

    this.router.navigate(['/cinema/movie-card']);
  }

  ngOnDestroy(): void {}
}
