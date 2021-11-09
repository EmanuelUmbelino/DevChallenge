import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Email address is required', })
    @IsEmail({}, { message: 'Enter a valid email address', },)
    @MaxLength(200, { message: 'The email address must be less than 200 characters', })
    email: string;

    @IsNotEmpty({ message: 'Name is required', })
    @MaxLength(200, { message: 'The user name must be less than 200 characters', })
    name: string;

    @IsNotEmpty({ message: 'Password is required', })
    @MinLength(6, { message: 'Password must be at least 6 characters', })
    password: string;

    @IsNotEmpty({ message: 'Password confirmation is required', })
    @MinLength(6, { message: 'Password must be at least 6 characters ', })
    passwordConfirmation: string;
}