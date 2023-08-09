import { Component, OnInit } from "@angular/core";
import { Observable, map } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { Movie } from "./../../..//models/index";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html', 
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailomponent implements OnInit {

    detail: Observable<Movie>;
    movieDetail: Movie;
    genres: string;

    constructor(private activatedRoute: ActivatedRoute) {
            
    }

    ngOnInit(): void {

        this.activatedRoute.queryParams.subscribe(params => {
            this.movieDetail = JSON.parse(params["movie"]);
        });        

        this.genres = this.movieDetail.genres.join(',')
    }

}