import { Component } from '@angular/core';

@Component({
  selector: 'movie-hall',
  templateUrl: './hall.component.html',
  styleUrls: [ './hall.component.scss' ]
})
export class HallComponent {
    
    rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    movieTitle:string = 'Movie';
    hallNumber: string = 'Hall Number';
    dateTime: string = 'Date Time';

    reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2','F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
    selected: string[] = [];

    //return status of each seat
    getStatus(seatPos: string): string {
        if(this.reserved.indexOf(seatPos) !== -1) {
            return 'reserved';
        } else if(this.selected.indexOf(seatPos) !== -1) {
            return 'selected';
        }
        return '';
    }

    seatClicked(pos: any) {

    }
    
}
