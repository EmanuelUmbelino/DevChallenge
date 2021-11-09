import { UserRole } from '../user-roles.enum';
import {
    IsString,
    IsEmail,
    IsOptional,
    MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Enter a valid user name', })
    @MaxLength(200, { message: 'The user name must be less than 200 characters', })
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail({}, { message: 'Enter a valid email address', },)
    email: string;

    @ApiProperty({ enum: UserRole })
    @IsOptional()
    role: UserRole;

    @ApiProperty()
    @IsOptional()
    status: boolean;
}