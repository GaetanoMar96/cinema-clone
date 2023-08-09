import { Component, OnInit } from "@angular/core";
import { MoviesService } from "./../movie.service";


@Component({
    selector: 'app-movie-form',
    templateUrl: './movie-form.component.html', 
})
export class MovieFormComponent implements OnInit {

    genresOptions =  [
        "Comedy",
        "Fantasy",
        "Crime",
        "Drama",
        "Music",
        "Adventure",
        "History",
        "Thriller",
        "Animation",
        "Family",
        "Mystery",
        "Biography",
        "Action",
        "Film-Noir",
        "Romance",
        "Sci-Fi",
        "War",
        "Western",
        "Horror",
        "Musical",
        "Sport"
    ];

    form = {
        submitted: false,
        genresChosen: [''],
        movie: {
            title: "",
            year: 0,
            runtime : 0,
            genres: [""],
            director: "",
            actors: [""],
            plot: "",
            posterUrl: ""
        },
        onSubmit() { this.submitted = true; },
        resetMovie() {
            this.movie = {
                title: "",
                year: 0,
                runtime : 0,
                genres: [""],
                director: "",
                actors: [""],
                plot: "",
                posterUrl: ""
            };
            this.submitted = false;
        }
    }

    constructor(private movieService: MoviesService) {}

    ngOnInit(): void {
        this.form.resetMovie();
    }

    addMovie() {
        this.movieService.addMovies(this.form.movie);
    }

}