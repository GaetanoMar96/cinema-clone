import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Movie, Show, Seat } from './../../../models/index';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CinemaService } from './../../../services/index';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, OnDestroy {
  
  selectedMovie: Movie;
  shows: Show[] = [];
  
  movieTitle: string;

  constructor(
    private cinemaService: CinemaService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.cinemaService.selectedMovieSubject.subscribe(movie => {
      this.selectedMovie = movie;
    });
    
    if (this.selectedMovie.title) {
      this.movieTitle = this.selectedMovie.title;
      this.shows = this.cinemaService.getAllShowsForMovie(this.movieTitle);        
    }
  }

  getTicket(show: Show): void {
    if (show.startDate && show.startTime) {
      //force startTime
      const startTime = show.startTime.substring(0, show.startTime.length - 3)
      
      //store the chosen show
      this.cinemaService.selectedShowSubject.next(show);
      
      this.cinemaService.getAllSeatsForMovie(this.movieTitle, show.startDate, startTime)
      .subscribe({
        next: (seat: Seat) => {
          this.cinemaService.selectedSeatSubject.next(seat);
          this.router.navigate(['/cinema/hall'])
        },
        error: (error) => console.log(error),
      });
    }
  }

  ngOnDestroy(): void {
    
  }
}
