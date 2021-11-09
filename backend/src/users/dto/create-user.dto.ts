import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email address is required', })
    @IsEmail({}, { message: 'Enter a valid email address', },)
    @MaxLength(200, { message: 'The email address must be less than 200 characters', })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required', })
    @IsString({ message: 'Enter a valid user name', })
    @MaxLength(200, { message: 'The user name must be less than 200 characters', })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required', })
    @MinLength(6, { message: 'Password must be at least 6 characters', })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password confirmation is required', })
    @MinLength(6, { message: 'Password must be at least 6 characters ', })
    passwordConfirmation: string;
}