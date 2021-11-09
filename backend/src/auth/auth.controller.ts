import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{ message: string[], token: string }> {
        await this.authService.signUp(createUserDto);
        const token = await this.authService.signIn(createUserDto);
        return {
            token,
            message: ['Registration successfully completed'],
        };
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    ): Promise<{ message: string[], token: string }> {
        const token = await this.authService.signIn(credentiaslsDto);
        return {
            token,
            message: ['Login successfully'],
        };
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user;
    }
}