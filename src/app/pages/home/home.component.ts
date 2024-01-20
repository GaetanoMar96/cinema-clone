import { Component, OnInit } from '@angular/core';
import { CinemaService } from './../../services/index';
import { Movie } from './../../models/index';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
  })
export class HomeComponent implements OnInit {
    
  movies: Movie[];

  constructor(private cinemaService: CinemaService) {}

  ngOnInit(): void {
    this.movies = this.cinemaService.getAllMovies();
  }
}