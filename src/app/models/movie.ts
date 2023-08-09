export interface Movie {
    title: string,
    year: number,
    runtime : number,
    genres: Array<string>,
    director: string,
    actors: Array<string>,
    plot: string,
    posterUrl: string
}