import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    Get,
    Param,
    Patch,
    ForbiddenException,
    Delete,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-users.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReturnLibraryDto } from 'src/reviews/dto/return-library.dto';
import { ReviewsService } from 'src/reviews/reviews.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private reviewsService: ReviewsService
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Administrator successfully registered', type: ReturnUserDto })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Role(UserRole.ADMIN)
    async createAdminUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.createAdminUser(createUserDto);
        return {
            user,
            message: ['Administrator successfully registered'],
        };
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'User found', type: ReturnUserDto })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findUserById(@Param('id') id): Promise<ReturnUserDto> {
        const user = await this.usersService.findUserById(id);
        return {
            user,
            message: ['User found'],
        };
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'User updated', type: User })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateUser(
        @Param('id') id: string,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @GetUser() user: User,
    ) {
        if (user.role != UserRole.ADMIN && user.id.toString() != id) {
            throw new ForbiddenException(['You are not authorized to access this feature'],);
        } else {
            return this.usersService.updateUser(updateUserDto, id);
        }
    }

    @Patch(':id/change-password')
    @ApiResponse({ status: 200, description: 'Password changed' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async changePassword(
        @Param('id') id: string,
        @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
        @GetUser() user: User,
    ) {
        if (user.role !== UserRole.ADMIN && user.id.toString() !== id)
            throw new ForbiddenException(['You are not authorized to access this feature'],);
        if (user.email !== changePasswordDto.email)
            throw new UnauthorizedException(['Invalid credentials']);

        await this.usersService.changePassword(changePasswordDto, user.id);
        return {
            message: 'Password changed',
        };
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'User removed successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Role(UserRole.ADMIN)
    async deleteUser(@Param('id') id: string) {
        await this.usersService.deleteUser(id);
        return {
            message: ['User removed successfully'],
        };
    }

    @Get(':id/library')
    @ApiResponse({ status: 200, description: 'Current user info', type: ReturnLibraryDto })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getUserLibrary(
        @Param('id') id: string,
    ): Promise<ReturnLibraryDto> {
        const library = await this.reviewsService.getReviewsByUser(id);
        return {
            library: library,
            message: ['User library found'],
        };
    }
}