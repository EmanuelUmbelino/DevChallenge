import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReturnLoginDto } from './dto/return-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @ApiResponse({ status: 201, description: 'Registration successfully completed', type: ReturnLoginDto })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnLoginDto> {
        await this.authService.signUp(createUserDto);
        const token = await this.authService.signIn(createUserDto);
        return {
            token,
            message: ['Registration successfully completed'],
        };
    }

    @Post('/signin')
    @ApiResponse({ status: 200, description: 'Login successfully', type: ReturnLoginDto })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async signIn(
        @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    ): Promise<ReturnLoginDto> {
        const token = await this.authService.signIn(credentiaslsDto);
        return {
            token,
            message: ['Login successfully'],
        };
    }

    @Get('/me')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Current user info', type: User })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user;
    }
}