import { Movie } from '../movie.entity';

export class ReturnMovieDto {
    movie: Movie;
    message: string[];
}