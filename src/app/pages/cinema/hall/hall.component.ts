import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CinemaService, TicketService, TransactionService } from './../../../services/index';
import { AuthenticationResponse, ClientInfo, Movie, Seat } from './../../../models/index';

@Component({
  selector: 'movie-hall',
  templateUrl: './hall.component.html',
  styleUrls: [ './hall.component.scss' ]
})
export class HallComponent implements OnInit, OnDestroy {
    
    private user: AuthenticationResponse | null;
    private movie: Movie | null;
    private seat: Seat | null;

    rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    movieTitle:string = 'Movie';
    hallNumber: string = 'Hall Number'; // i need it
    dateTime: string = 'Date Time';

    reserved: Array<string> = [];

    constructor(
        private authenticationService: AuthenticationService,
        private cinemaService: CinemaService,
        private ticketService: TicketService,
        private transactionService: TransactionService,
        private router: Router
      ) {
    
      }

    ngOnInit(): void {
        this.cinemaService.seat.subscribe(seat => {
            this.seat = seat;
            if (seat.availableSeats)
                this.reserved = seat.availableSeats;
        });

        this.user = this.authenticationService.userValue;
        this.movie = this.cinemaService.movie.value;
        
        const show = this.cinemaService.show.value;
        if (this.movie.title) {
            this.movieTitle = this.movie.title;
        }

        if (show) {
            this.dateTime = show.startDate + '-' + show.startTime;
        }
    }

    //return status of each seat
    getStatus(seatPos: string): string {
        if(this.reserved.indexOf(seatPos) !== -1) {
            return 'reserved';
        } 
        return 'free';
    }

    //purchase ticket
    seatClicked(pos: string) {
        //if base cost is > that wallet i need to increase it

        //with log in i need the wallet

        if (this.seat && this.seat.baseCost && this.seat.baseCost > 0) {
            this.increaseWallet(this.seat?.baseCost)
        }
        
        //add a form for age and is student
        let clientInfo: ClientInfo = {
            userId: this.user?.userId,
            idMovie: this.movie?.id,
            seat: pos
        }
    
        this.ticketService.postMovieTicket(clientInfo)
        .subscribe(
            (error) => {
                console.log(error)
            }
        )
    }

    increaseWallet(amount: number) {
        if (this.user?.userId) {
            this.transactionService.putTransaction(
                this.user?.userId,
                amount
            )
        }
    }

    callFormForAgeAndStudent() {

    }
    
    ngOnDestroy(): void {
        this.cinemaService.movie.unsubscribe();
        this.cinemaService.seat.unsubscribe();
        this.cinemaService.show.unsubscribe();
    }
}
