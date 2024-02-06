import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Movie, Show, Seat } from './../../../models/index';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CinemaService } from './../../../services/index';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, OnDestroy {
  
  selectedMovie: Movie;
  show: Show;
  movieTitle: string = "";

  private destroy$ = new Subject<void>();

  constructor(
    private cinemaService: CinemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cinemaService.selectedMovieSubject
    .pipe(takeUntil(this.destroy$))
    .subscribe(movie => {
      this.selectedMovie = movie;
    });
    
    if (this.selectedMovie.title) {
      this.movieTitle = this.selectedMovie.title;
      this.cinemaService.getAllShowsForMovie(this.selectedMovie.id)
      .subscribe(
        (show: any) => {
          this.show = show
        }
      );     
    }
  }

  getTicket(show: Show): void {
      //store the chosen show
      this.cinemaService.selectedShowSubject.next(show);
      
      this.cinemaService.getAllSeatsForMovie(show.movieId, show.showId)
      .subscribe({
        next: (seat: Seat) => {
          this.cinemaService.selectedSeatSubject.next(seat);
          this.router.navigate(['/cinema/hall'])
        },
        error: (error) => console.log(error),
      });
  }
  

  ngOnDestroy(): void {
    
  }
}
