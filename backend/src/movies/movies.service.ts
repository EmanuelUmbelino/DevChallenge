import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MoviesRepository)
        private moviesRepository: MoviesRepository,
        private reviewsService: ReviewsService,
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


    async addToLibrary(imdbID: string, userId: string): Promise<Review> {
        await this.findMovieByImdbId(imdbID);

        return this.reviewsService.createReview(imdbID, userId);
    }

    async removeFromLibrary(imdbID: string, userId: string) {
        await this.reviewsService.disableReview(imdbID, userId);
    }
}
