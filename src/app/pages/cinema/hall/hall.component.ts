import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CinemaService, TicketService } from './../../../services/index';
import { AuthenticationResponse, ClientInfo, Movie, Seat } from './../../../models/index';
import { DialogService } from './../../../services/index';
import { DialogComponent } from './dialog/dialog.component';

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

    reserved: Array<string> = ['A1', 'A2', 'A3', 'A4', 'A5'];


    constructor(
        private authenticationService: AuthenticationService,
        private cinemaService: CinemaService,
        private ticketService: TicketService,
        private router: Router,
        //private dialogService: DialogService
      ) {
    
      }

    ngOnInit(): void {
        /*this.cinemaService.seat.subscribe(seat => {
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
        }*/
    }

    //return status of each seat
    getStatus(seatPos: string): string {
        if(this.reserved.indexOf(seatPos) !== -1) {
            return 'reserved';
        } 
        return 'available';
    }

    //purchase ticket
    seatClicked(pos: string): void {
        //this.openDialogForAgeAndStudent();
        
        if (!this.user) { 
            console.log('No user logged in');
            this.router.navigate(['/auth/login']);
            return;
        } 
        
        /*if (this.user.age == undefined || this.user.isStudent == undefined ) {
            //this.openDialogForAgeAndStudent();
            return;
        }

        if (this.seat && this.seat.baseCost) {
            if (this.user.wallet && this.seat.baseCost > this.user.wallet) {
                this.openDialogForWallet();
                return;
            }
        }  */
        
        //add a form for age and is student
        let clientInfo: ClientInfo = {
            userId: this.user?.userId,
            idMovie: this.movie?.id,
            seat: pos,
            age: 33,//this.user?.age,
            isStudent: true,//this.user?.isStudent,
            wallet: 20//this.user?.wallet
        }
    
        this.ticketService.postMovieTicket(clientInfo)
        .subscribe({
            next: data => {
                console.log('purchased!!!')
                this.router.navigate(['cinema'])
            },
            error: error => console.log(error)
        }
        )
    }

    openDialogForAgeAndStudent() {
        console.log('age!!!')
        //this.dialogService.open()
    }

    openDialogForWallet() {
        console.log('wallet increase!!!')
        //this.dialogService.open()
    }
    
    ngOnDestroy(): void {
        //this.cinemaService.movie.unsubscribe();
        //this.cinemaService.seat.unsubscribe();
        //this.cinemaService.show.unsubscribe();
    }
}
