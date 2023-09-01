import { Component } from '@angular/core';
import { CinemaService } from './../../services/index';
import { Movie } from './../../models/index';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
  })
export class HomeComponent {
    
  movies: Movie[] = this.cinemaService.getAllMovies();

  constructor(private cinemaService: CinemaService) {}

    ngOninit() {
      
    }
}