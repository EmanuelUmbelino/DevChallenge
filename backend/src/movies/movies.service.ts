import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MoviesRepository)
        private moviesRepository: MoviesRepository,
    ) { }

    async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesRepository.createMovie(createMovieDto);
    }

    async findAllMovies(): Promise<Movie[]> {
        const movies = await this.moviesRepository.find();

        if (!movies) throw new NotFoundException(['Movie not found']);

        return movies;
    }

    async findMovieByImdbId(imdbId: string): Promise<Movie> {
        const movie = await this.moviesRepository.findOne(imdbId, {
            select: ['imdbID', 'title', 'year', 'type', 'poster'],
        });

        if (!movie) throw new NotFoundException(['Movie not found']);

        return movie;
    }
}
