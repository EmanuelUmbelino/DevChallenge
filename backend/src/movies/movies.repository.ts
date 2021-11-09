import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
    async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        const movie = this.create();
        movie.imdbID = createMovieDto.imdbID;
        movie.title = createMovieDto.title;
        movie.year = createMovieDto.year;
        movie.type = createMovieDto.type;
        movie.poster = createMovieDto.poster;
        try {
            await movie.save();
            return movie;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException(['Movie is already in the database']);
            } else {
                throw new InternalServerErrorException(
                    ['Error saving movie to database'],
                );
            }
        }
    }
}