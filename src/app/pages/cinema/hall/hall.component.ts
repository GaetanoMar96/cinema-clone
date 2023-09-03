import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CinemaService, TicketService } from './../../../services/index';
import { AuthenticationResponse, ClientInfo, Movie, Show, Seat } from './../../../models/index';
import { DialogService } from './../../../services/index';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ticket } from '../../../helpers/index';

@Component({
  selector: 'movie-hall',
  templateUrl: './hall.component.html',
  styleUrls: [ './hall.component.scss' ]
})
export class HallComponent implements OnInit, OnDestroy {
    
    
    private userId: string;
    movie: Movie;
    show: Show;
    seat: Seat;
    title: string = 'title';
    hallName: string = 'hall';
    dateTime: string = 'Date Time';

    //Hall seats
    rows: string[] = ['A', 'B', 'C', 'D', 'E'];
    cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    available: Array<string> = [];
    reserved: Array<string> = [];
    selected: Array<string> = [];

    private ticketInfo: ClientInfo;
    private transaction: Subscription = new Subscription();
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
        if (this.authenticationService.userValue?.userId === undefined) { 
            console.log('No user logged in');
            this.router.navigate(['/auth/login']);
            return;
        }

        this.userId = this.authenticationService.userValue.userId;

        this.cinemaService.selectedMovie$
        .pipe(takeUntil(this.destroy$))
        .subscribe(
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
        
        if(this.movie && this.movie.title) {
            this.title = this.movie.title;
        }

        if (this.seat && this.seat.hallName) {
            this.hallName = this.seat.hallName
        }

        if (this.show) {
            this.dateTime = this.show.startDate + '-' + this.show.startTime;
        }

        this.transaction = this.dialogService.transaction.subscribe(
            (data) => {
                if (data)
                    this.purchaseTicket();
            }
        )
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

    //Store all the selected seats
    clearSelectedSeat(pos: string) {
        const index = this.selected.indexOf(pos, 0);
        if (index > -1) {
            this.selected.splice(index, 1);
        }
    }

    reserveTickets(): void {
        let totalPrice = 0;
        if (this.seat && this.seat.baseCost)
            totalPrice = this.selected.length * this.seat.baseCost;
        
        this.ticketInfo = {
            userId: this.userId,
            idMovie: this.movie?.id,
            seats: this.selected,
            totalPrice: totalPrice
        }

        this.openDialogForPayment();
    }

    openDialogForPayment(): void {
        this.dialogService.openConfirmationDialog(this.ticketInfo);
    }

    //purchase ticket
    purchaseTicket(): void {
        this.ticketService.postMovieTicket(this.ticketInfo)
        .subscribe({
            next: data => {
                console.log('purchased!!!')
                //store tickets purchased inside a subject
                this.handleTicket(this.ticketInfo);
                this.router.navigate(['/home']);
            },
            error: error => console.log(error)
        }
        )
    }

    handleTicket(ticketInfo: ClientInfo): void {
        //storing ticket info
        this.ticketService.ticketInfo.next(ticketInfo);
        
        if (ticketInfo.seats) {
            for(let i = 0; i < ticketInfo.seats?.length; i++) {
                let ticket: Ticket = {
                    movie: this.movie.title,
                    startDate: this.show.startDate,
                    startTime: this.show.startTime,
                    seat: ticketInfo.seats[i],
                    cost: this.seat.baseCost
                }
                this.ticketService.tickets.push(ticket);
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.transaction.unsubscribe();
    }
}
