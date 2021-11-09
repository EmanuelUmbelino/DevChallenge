import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'ImdbID is required', })
    @MaxLength(200, { message: 'The imdbID must be less than 200 characters', })
    imdbID: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Title is required', })
    @IsString({ message: 'Enter a valid title', })
    @MaxLength(200, { message: 'The title must be less than 200 characters', })
    title: string;

    @ApiProperty()
    @IsOptional()
    year: string;

    @ApiProperty()
    @IsOptional()
    type: string;

    @ApiProperty()
    @IsOptional()
    poster: string;
}