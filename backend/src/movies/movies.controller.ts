import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ReturnMovieDto } from './dto/return-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
@UseGuards(AuthGuard(), RolesGuard)
export class MoviesController {
    constructor(private moviesService: MoviesService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Movie successfully registered', type: Movie })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createMovie(
        @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    ): Promise<ReturnMovieDto> {
        const movie = await this.moviesService.createMovie(createMovieDto);
        return {
            movie,
            message: ['Movie successfully registered'],
        };
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Movie found', type: Movie })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAllMovies(): Promise<{ movies: Movie[], message: string[] }> {
        const movies = await this.moviesService.findAllMovies();
        return {
            movies,
            message: ['Movies found'],
        };
    }

    @Get(':imdbId')
    @ApiResponse({ status: 200, description: 'Movie found', type: Movie })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findMovieByImdbId(@Param('imdbId') imdbId): Promise<ReturnMovieDto> {
        const movie = await this.moviesService.findMovieByImdbId(imdbId);
        return {
            movie,
            message: ['Movie found'],
        };
    }

}
