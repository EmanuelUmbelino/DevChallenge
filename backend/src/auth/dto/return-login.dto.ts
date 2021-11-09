import { ApiProperty } from '@nestjs/swagger';

export class ReturnLoginDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    message: string[];
}