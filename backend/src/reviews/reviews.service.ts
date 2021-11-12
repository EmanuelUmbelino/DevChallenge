import {
    Injectable,
    NotFoundException,
    Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsRepository } from './reviews.repository';
import { Review } from './review.entity';

@Injectable({ scope: Scope.REQUEST })
export class ReviewsService {
    constructor(
        @InjectRepository(ReviewsRepository)
        private reviewsRepository: ReviewsRepository,
    ) { }

    async createReview(movieImdbID: string, userId: string): Promise<Review> {
        const result = await this.reviewsRepository.update({ movie: movieImdbID, user: userId }, { enabled: true });

        if (result.affected > 0) {
            const review: Review = await this.reviewsRepository.findOne({ relations: ['movie'], where: { movie: movieImdbID, user: userId } });
            return review;
        } else {
            return this.reviewsRepository.createReview(movieImdbID, userId);
        }
    }

    async getReview(movieImdbID: string, userId: string): Promise<Review> {
        const review: Review = await this.reviewsRepository.findOne({ relations: ['movie'], where: { movie: movieImdbID, user: userId } });

        if (!review) throw new NotFoundException(['Review not found']);

        return review;
    }

    async getReviewsByUser(userId: string): Promise<Review[]> {
        return this.reviewsRepository.find({ relations: ['movie'], where: { user: userId, enabled: true } });
    }

    async disableReview(movieImdbID: string, userId: string): Promise<Review> {
        const result = await this.reviewsRepository.update({ movie: movieImdbID, user: userId }, { enabled: false });

        if (result.affected > 0) {
            const review: Review = await this.reviewsRepository.findOne({ loadRelationIds: true, where: { movie: movieImdbID, user: userId } });
            return review;
        } else {
            throw new NotFoundException(['Review not found']);
        }
    }
}
