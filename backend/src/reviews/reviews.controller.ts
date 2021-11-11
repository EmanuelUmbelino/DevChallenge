import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
@UseGuards(AuthGuard(), RolesGuard)
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) { }
}
