import {
    BaseEntity,
    Entity,
    Unique,
    ManyToOne,
    Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/movie.entity';
import { User } from 'src/users/user.entity';

@Entity()
@Unique(['movie', 'user'])
export class Review extends BaseEntity {
    @ApiProperty()
    @ManyToOne(() => Movie, movie => movie.imdbID, { primary: true })
    movie: string;

    @ApiProperty()
    @ManyToOne(() => User, user => user.id, { primary: true })
    user: string;

    // @ApiProperty({ required: false })
    // @Column({ nullable: true })
    // review: Express.Multer.File;

    @ApiProperty()
    @Column()
    enabled: boolean;
}