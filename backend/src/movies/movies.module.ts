import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoviesRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule { }
