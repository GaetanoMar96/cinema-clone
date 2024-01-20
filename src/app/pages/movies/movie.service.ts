import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, filter, retry } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { Movie } from "./../../models/index";
//import * as movieJson from './../../models/mocked_data/movies/get.json' ;

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    /*
    moviesListChanged = new Subject<Movie[]>();
    editing = new Subject<number>()

    private movies: Movie[] = [];
    private moviesFiltered: Movie[] = [];

    constructor(private http: HttpClient) {
    }

    getMovies(): Movie[] {
        if (this.movies && this.movies.length > 0) {
            return this.movies.slice();
        }
        this.fetchMovies();
        return this.movies;
    }
    
    setMovies(movies: Movie[]) {
        movies.map((movie)  => {
            let m: Movie = {
                title: movie.title,
                year: movie.year,
                runtime : movie.runtime,
                genres: movie.genres,
                director: movie.director,
                actors: movie.actors,
                plot: movie.plot,
                posterUrl: movie.posterUrl
            }
            this.movies.push(m); 
            }   
        )
    }

    fetchMovies(): void {
        let json = JSON.stringify(movieJson);

        let jsonObj = JSON.parse(json); // string to "any" object first
        console.log(jsonObj)
        jsonObj.movies.map((movie: Movie) => {
            let m: Movie = {
                title: movie.title,
                year: movie.year,
                runtime : movie.runtime,
                genres: movie.genres,
                director: movie.director,
                actors: movie.actors,
                plot: movie.plot,
                posterUrl: movie.posterUrl
            }
            this.movies.push(m);
        })

    }

    addMovies(movie: Movie): void {
        let m: Movie = {
            title: movie.title,
            year: movie.year,
            runtime : movie.runtime,
            genres: movie.genres,
            director: movie.director,
            actors: movie.actors,
            plot: movie.plot,
            posterUrl: movie.posterUrl
        }

        this.movies.push(m);
        this.moviesListChanged.next(this.movies.slice());
    }

    modifyMovie(idx: number, movie: Movie) {
        this.movies[idx] = movie
        this.moviesListChanged.next(this.movies.slice())
    }

    deleteMovie(idx: number) {
        this.movies.splice(idx, 1)
        this.moviesListChanged.next(this.movies.slice())
    }

    searchByField(searchItem: string, value: string): Movie[] {
        switch(searchItem) {
            case "title":
                this.movies.forEach(movie => {
                    if (movie.title.toLowerCase().includes(value.toLowerCase())) {
                            this.moviesFiltered.push(movie);
                        }
                    })
            break;

            case "year":
                this.movies.forEach(movie => {
                    if (movie.year == Number.parseInt(value)) {
                        this.moviesFiltered.push(movie);
                    }
                })
            
            break;

            case "genre":
                this.movies.forEach(movie => {
                    if (movie.genres.includes(value.toLowerCase())) {
                        this.moviesFiltered.push(movie);
                    }
                })
                
            break;

            default:
                console.log(searchItem);
                return this.moviesFiltered.slice();
            }
 
      this.movies = this.moviesFiltered;
      return this.moviesFiltered.slice();
  }
*/
}