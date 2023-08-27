import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CinemaService, TicketService } from './../../../services/index';
import { AuthenticationResponse, ClientInfo, Movie, Show, Seat } from './../../../models/index';
import { DialogService } from './../../../services/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ticket } from '../../../helpers/index';

@Component({
  selector: 'movie-hall',
  templateUrl: './hall.component.html',
  styleUrls: [ './hall.component.scss' ]
})
export class HallComponent implements OnInit, OnDestroy {
    
    private user: AuthenticationResponse | null;
    movie: Movie;
    show: Show;
    seat: Seat;

    rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    movieTitle:string = 'Movie';
    hallNumber: string = 'Hall Number'; // i need it
    dateTime: string = 'Date Time';

    available: Array<string> = [];
    reserved: Array<string> = [];
    selected: Array<string> = [];

    private destroy$ = new Subject<void>(); // Subject for unsubscribing

    constructor(
        private authenticationService: AuthenticationService,
        private cinemaService: CinemaService,
        private ticketService: TicketService,
        private router: Router,
        private dialogService: DialogService
      ) {
    
      }

    ngOnInit(): void {
        this.user = this.authenticationService.userValue;

        this.cinemaService.selectedMovie$.subscribe(
            movie => this.movie = movie
        );

        this.cinemaService.selectedSeat$
        .pipe(takeUntil(this.destroy$))
        .subscribe(seat => {
            this.seat = seat;
            if (seat.availableSeats)
                this.available = seat.availableSeats;
        });

        this.cinemaService.selectedShow$
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            show => this.show = show
        );
        
        if (this.movie.title) {
            this.movieTitle = this.movie.title;
        }

        if (this.show) {
            this.dateTime = this.show.startDate + '-' + this.show.startTime;
        }
    }

    //return status of each seat
    getStatus(seatPos: string): string {
        if (this.selected.indexOf(seatPos) !== -1) {
            return 'selected';
        } else if(this.available.indexOf(seatPos) !== -1) {
            return 'available';
        } 
        return 'reserved';
    }

    seatsEmpty() {
        return this.selected.length === 0;
    }

    //Store all the selected seats
    seatClicked(pos: string) {
        this.selected.push(pos);
    }

    //purchase ticket
    purchaseTicket(): void {
        if (!this.user) { 
            console.log('No user logged in');
            this.router.navigate(['/auth/login']);
            return;
        } 
        
        if (this.user.age == undefined || this.user.isStudent == undefined ) {
            console.log('age problem');
            this.openDialogForAgeAndStudent();
            return;
        }

        if (this.seat && this.seat.baseCost) {
            if (this.user.wallet && this.seat.baseCost > this.user.wallet) {
                console.log('wallet problem');
                console.log(this.user.wallet);
                this.openDialogForWallet();
                return;
            }
        } 
        
        let clientInfo: ClientInfo = {
            userId: this.user?.userId,
            idMovie: this.movie?.id,
            age: 23,//this.user?.age,
            isStudent: true,//this.user?.isStudent,
            wallet: 20,//this.user?.wallet,
            seats: this.selected,
        }
    
        this.ticketService.postMovieTicket(clientInfo)
        .subscribe({
            next: data => {
                console.log('purchased!!!')
                //store tickets purchased inside a subject
                this.handleTicket(clientInfo);
                this.router.navigate(['cinema'])
            },
            error: error => console.log(error)
        }
        )
    }

    openDialogForAgeAndStudent() {
        this.dialogService.openConfirmationDialog();
    }

    openDialogForWallet() {
        this.dialogService.openConfirmationDialog();
    }

    handleTicket(clientInfo: ClientInfo): void {
        if (clientInfo.seats) {
            for(let i = 0; i < clientInfo.seats?.length; i++) {
                let ticket: Ticket = {
                    movie: this.movie.title,
                    startDate: this.show.startDate,
                    startTime: this.show.startTime,
                    seat: clientInfo.seats[i],
                    cost: this.seat.baseCost
                }
                this.ticketService.tickets.push(ticket);
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
