import { ApiProperty } from '@nestjs/swagger';

export class ReturnLoginDto {
    @ApiProperty()
    data: {
        token: string;
        userId: string;
    };

    @ApiProperty()
    message: string[];
}