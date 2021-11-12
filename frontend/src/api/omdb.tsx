import { Movie } from "./library";

type MovieSearchError = {
    Response: 'False';
    Error: string;
}

type MovieBack = {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

type MovieSearch = {
    Response: 'True';
    totalResults: string;
    Search: MovieBack[];
}

const path = `http://www.omdbapi.com/?apikey=ef100772`;

export function searchMovie(title: string) {
    return fetch(`${path}&s=${title}`)
        .then(res => res.json())
        .then((result: MovieSearch | MovieSearchError) => {
            if (result.Response === 'True') {
                return result.Search.map(el => {
                    const movie: Movie = {
                        imdbID: el.imdbID,
                        poster: el.Poster,
                        title: el.Title,
                        type: el.Type,
                        year: el.Year
                    }
                    return movie;
                });
            } else {
                // notificar result.error
                return [];
            }
        }, (error) => {
            // notificar error
            return [];
        });
}