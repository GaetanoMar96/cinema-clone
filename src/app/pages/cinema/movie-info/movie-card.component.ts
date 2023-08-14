import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Movie } from './../../../models/index';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CinemaService } from './../../../services/index';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, OnDestroy {
  movie: Movie;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cinemaService: CinemaService
  ) {}

  ngOnInit(): void {
    this.cinemaService.movie.subscribe((movie) => {
      this.movie = movie;
    });

    //add calMovieCarmoviel to get shows
  }

  ngOnDestroy(): void {
    this.cinemaService.movie.unsubscribe();
  }
}
