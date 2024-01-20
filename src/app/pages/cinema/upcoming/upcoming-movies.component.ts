import { Component, OnInit } from '@angular/core';
import { CinemaService } from './../../../services/index';
import { Movie } from './../../../models/index';
import { Router } from '@angular/router';

@Component({
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.scss']
})
export class UpcomingMoviesComponent implements OnInit {
  
  movies: Movie[] = [];

  constructor(private cinemaService: CinemaService, 
    private router: Router) {}

  ngOnInit() {
    this.movies = this.getUpcomingMovies(); 
  }

  getUpcomingMovies(): Movie[] {
    if (this.cinemaService.upcomingMovies && this.cinemaService.upcomingMovies.length > 0) {
      return this.cinemaService.upcomingMovies.slice();
    } else {
      this.cinemaService.getUpcomingMovies();
      return this.cinemaService.upcomingMovies;
    }
  }
}
