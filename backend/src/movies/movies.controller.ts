import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ReturnMovieDto } from './dto/return-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
@UseGuards(AuthGuard(), RolesGuard)
export class MoviesController {
    constructor(private moviesService: MoviesService) { }

    @Post()
    async createMovie(
        @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    ): Promise<ReturnMovieDto> {
        const movie = await this.moviesService.createMovie(createMovieDto);
        return {
            movie: movie,
            message: ['Movie successfully registered'],
        };
    }

}
