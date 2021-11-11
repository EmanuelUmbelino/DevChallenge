import { ApiProperty } from '@nestjs/swagger';
import { Review } from '../review.entity';

export class ReturnLibraryDto {
    @ApiProperty()
    library: Review[];

    @ApiProperty()
    message: string[];
}