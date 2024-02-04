export interface Show { 
    moviedId: string;
    movieShows: Array<ShowDate>;
}

export interface ShowDate {
    startDate: string;
}
