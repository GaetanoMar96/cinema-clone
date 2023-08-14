import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Movie, Show, Seat } from './../../../models/index';
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
  shows: Show[] = [];
  
  movieTitle: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cinemaService: CinemaService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.cinemaService.movie.subscribe(movie => {
      this.movie = movie;
    });

    if (this.movie.title) {
      this.movieTitle = this.movie.title;
      this.shows = [{
        startDate: '2023-08-14',
        startTime: '10:00'
      },{
        startDate: '2023-08-14',
        startTime: '12:00'
      }
      ,{
        startDate: '2023-08-14',
        startTime: '12:00'
      }]

      //this.shows = this.cinemaService.getAllShowsForMovie(this.movieTitle);        
    }
  }

  getTicket(show: Show): void {
    if (show.startDate && show.startTime) {
      this.cinemaService.getAllSeatsForMovie(this.movieTitle, show.startDate, show.startTime)
      .subscribe({
        next: (seat: Seat) => {
          this.cinemaService.seat.next(seat);
          this.router.navigate(['/hall'])
        },
        error: (error) => console.log(error),
      });
    }
  }

  ngOnDestroy(): void {
    
  }
}
