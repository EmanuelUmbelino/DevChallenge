import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { passportModule } from 'src/auth/constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        passportModule,
        ReviewsModule,
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule { }