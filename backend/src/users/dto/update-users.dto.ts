import { UserRole } from '../user-roles.enum';
import {
    IsString,
    IsEmail,
    IsOptional,
    MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message: 'Enter a valid user name', })
    @MaxLength(200, { message: 'The user name must be less than 200 characters', })
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail({}, { message: 'Enter a valid email address', },)
    email: string;

    @ApiProperty({ enum: UserRole, required: false })
    @IsOptional()
    role: UserRole;

    @ApiProperty({ required: false })
    @IsOptional()
    status: boolean;
}