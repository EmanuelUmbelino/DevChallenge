import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty({ message: 'ImdbID is required', })
    @MaxLength(200, { message: 'The imdbID must be less than 200 characters', })
    imdbID: string;

    @IsNotEmpty({ message: 'Title is required', })
    @IsString({ message: 'Enter a valid title', })
    @MaxLength(200, { message: 'The title must be less than 200 characters', })
    title: string;

    @IsOptional()
    year: string;

    @IsOptional()
    type: string;

    @IsOptional()
    poster: string;
}