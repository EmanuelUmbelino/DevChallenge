import api, { RequestError } from "./api";

export type Movie = {
    imdbID: string;
    title: string;
    year: string;
    type: string;
    poster: string;
}

export type Review = {
    enabled: boolean;
    movie: string;
    user: string;
}

export type ReviewSaved = {
    review: Review;
    message: string[];
}

export type UserLibrary = {
    library: Review[];
    message: string[];
}

export function AddToLibrary(movie: Movie) {
    return api.post(`/movies/${movie.imdbID}/library`, movie);
    // return api.post<ReviewSaved | RequestError>(`/movies/${movie.imdbID}/library`, movie);
}

export function RemoveFromLibrary(movieImdbID: string) {
    return api.delete(`/movies/${movieImdbID}/library`);
    // return api.delete<RequestError>(`/movies/${movieImdbID}/library`);
}

export function GetUserLibrary(userId: string) {
    return api.get(`/users/${userId}/library`);
    // return api.get<UserLibrary | RequestError>(`/users/${userId}/library`);
}