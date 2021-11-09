import { Injectable } from '@nestjs/common';
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
}
