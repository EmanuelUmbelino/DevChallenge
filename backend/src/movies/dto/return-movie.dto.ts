import { Movie } from '../movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnMovieDto {
    @ApiProperty()
    movie: Movie;

    @ApiProperty()
    message: string[];
}