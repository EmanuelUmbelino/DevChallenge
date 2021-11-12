import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ReturnMovieDto } from './dto/return-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { ReturnAddToLibraryDto } from './dto/return-add-to-library.dto';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
@UseGuards(AuthGuard(), RolesGuard)
export class MoviesController {
    constructor(
        private moviesService: MoviesService,
    ) { }

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

    @Post(':imdbID/library')
    @ApiResponse({ status: 201, description: 'Movie added to library successfully', type: ReturnAddToLibraryDto })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async addToLibrary(
        @Param('imdbID') imdbID: string,
        @GetUser() user: User,
        @Body(ValidationPipe) createMovieDto: CreateMovieDto,
    ): Promise<ReturnAddToLibraryDto> {
        const movie = await this.moviesService.createMovie(createMovieDto);
        const review = await this.moviesService.addToLibrary(imdbID, user.id.toString());
        return {
            review,
            message: ['Movie added to library successfully'],
        };
    }

    @Delete(':imdbID/library')
    @ApiResponse({ status: 201, description: 'Movie removed from library successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async removeFromLibrary(
        @Param('imdbID') imdbID: string,
        @GetUser() user: User,
    ) {
        const review = await this.moviesService.removeFromLibrary(imdbID, user.id.toString());
        return {
            review,
            message: ['Movie removed from library successfully'],
        };
    }

}
