import { Component, OnDestroy, OnInit, Input } from "@angular/core";
import { MoviesService } from "./movie.service";
import { Movie } from "./../../models/index";
import { Subscription } from "rxjs";
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html', 
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
    
    movies: Movie[] = [];
    subscription: Subscription = new Subscription();

    searchItem: string;
    valueItem: string;

    constructor(private movieService: MoviesService,
        private router: Router) {}

    ngOnInit() {
        this.movies = this.movieService.getMovies();
        this.subscription = this.movieService.moviesListChanged.
        subscribe(
            (movies: Movie[]) => {this.movies = movies}
        );
    }

    ngOnChanges() {
        this.subscription = this.movieService.moviesListChanged.
        subscribe(
            (movies: Movie[]) => {this.movies = movies}
        );
    }

    onDetailMovie(movie: Movie) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "movie": JSON.stringify(movie).toString()
            }
            , skipLocationChange: true
          };
        this.router.navigate(['movies/movie-detail'], navigationExtras);
    }

    onEditMovie(idx: number){
        this.movieService.editing.next(idx);
    }

    onDeleteMovie(idx: number){
        this.movieService.deleteMovie(idx);
    }

    onSearch() {
        this.movies = this.movieService.searchByField(this.searchItem, this.valueItem);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

}