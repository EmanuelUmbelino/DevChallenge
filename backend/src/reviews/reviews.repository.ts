import { EntityRepository, Repository } from 'typeorm';
import { Review } from './review.entity';
import {
    InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Review)
export class ReviewsRepository extends Repository<Review> {
    async createReview(movieImdbID: string, userId: string): Promise<Review> {
        const review = this.create();
        review.user = userId;
        review.movie = movieImdbID;
        review.enabled = true;
        try {
            await review.save();
            return review;
        } catch (error) {
            throw new InternalServerErrorException(
                ['Error adding to library to database'],
            );
        }
    }
}