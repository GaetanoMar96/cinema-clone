import { Component, OnInit } from '@angular/core';
import { CinemaService } from './../../services/index';
import { Movie } from './../../models/index';
import { Subscription } from 'rxjs';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
  })
export class HomeComponent implements OnInit {
    
  movies: Movie[];
  private moviesSubscription = new Subscription();

  constructor(private cinemaService: CinemaService) {}

  ngOnInit(): void {
    this.moviesSubscription = this.cinemaService.getAvailableMovies().subscribe(
      (movies: Movie[]) => this.movies = movies
    );
  }
  
  ngOnDestroy(): void {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }
}