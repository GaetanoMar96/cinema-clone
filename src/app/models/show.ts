export interface Show { 
    movieId: string;
    movieShows: Array<ShowDate>;
}

export interface ShowDate {
    startDate: string;
}
