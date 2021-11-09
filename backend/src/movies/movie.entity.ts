import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
@Unique(['imdbID'])
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    imdbID: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    title: string;

    @Column({ nullable: true, type: 'varchar', length: 20 })
    year: string;

    @Column({ nullable: true, type: 'varchar', length: 200 })
    type: string;

    @Column({ nullable: true, type: 'varchar', length: 400 })
    poster: string;
}