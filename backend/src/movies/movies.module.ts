import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { passportModule } from 'src/auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoviesRepository]),
    passportModule,
    ReviewsModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule { }
