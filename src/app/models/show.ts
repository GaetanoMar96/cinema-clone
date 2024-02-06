export interface Show { 
    movieId: number;
    showId: number;
    movieShows: Array<ShowDate>;
}

export interface ShowDate {
    startDate: string;
}
