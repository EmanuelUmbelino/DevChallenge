import { Movie } from "../components/MovieCard";

type MovieSearchError = {
    Response: 'False';
    Error: string;
}

type MovieSearch = {
    Response: 'True';
    totalResults: string;
    Search: Movie[];
}

const path = `http://www.omdbapi.com/?apikey=ef100772`;

export function searchMovie(title: string) {
    return fetch(`${path}&s=${title}`)
        .then(res => res.json())
        .then((result: MovieSearch | MovieSearchError) => {
            if (result.Response === 'True') {
                return result.Search;
            } else {
                // notificar result.error
                return [];
            }
        }, (error) => {
            // notificar error
            return [];
        });
}