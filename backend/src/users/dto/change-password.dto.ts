import {
    IsNotEmpty,
    MinLength,
} from 'class-validator';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';

export class ChangePasswordDto extends CredentialsDto {
    @IsNotEmpty({ message: 'New password is required', })
    @MinLength(6, { message: 'Password must be at least 6 characters', })
    newPassword: string;

    @IsNotEmpty({ message: 'Password confirmation is required', })
    @MinLength(6, { message: 'Password must be at least 6 characters ', })
    passwordConfirmation: string;
}