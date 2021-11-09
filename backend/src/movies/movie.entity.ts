import {
    BaseEntity,
    Entity,
    Unique,
    Column,
    PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['imdbID'])
export class Movie extends BaseEntity {

    @ApiProperty()
    @PrimaryColumn({ nullable: false, type: 'varchar', length: 200 })
    imdbID: string;

    @ApiProperty()
    @Column({ nullable: false, type: 'varchar', length: 200 })
    title: string;

    @ApiProperty({ required: false })
    @Column({ nullable: true, type: 'varchar', length: 20 })
    year: string;

    @ApiProperty({ required: false })
    @Column({ nullable: true, type: 'varchar', length: 200 })
    type: string;

    @ApiProperty({ required: false })
    @Column({ nullable: true, type: 'varchar', length: 400 })
    poster: string;
}