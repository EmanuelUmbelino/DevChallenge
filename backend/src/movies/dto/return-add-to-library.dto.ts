import { ApiProperty } from '@nestjs/swagger';
import { Review } from '../../reviews/review.entity';

export class ReturnAddToLibraryDto {
    @ApiProperty()
    review: Review;

    @ApiProperty()
    message: string[];
}