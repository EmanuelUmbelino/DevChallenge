import { UserRole } from '../user-roles.enum';
import {
    IsString,
    IsEmail,
    IsOptional,
    MaxLength
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'Enter a valid user name', })
    @MaxLength(200, { message: 'The user name must be less than 200 characters', })
    name: string;

    @IsOptional()
    @IsEmail({}, { message: 'Enter a valid email address', },)
    email: string;

    @IsOptional()
    role: UserRole;

    @IsOptional()
    status: boolean;
}