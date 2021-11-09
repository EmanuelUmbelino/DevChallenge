import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-roles.enum';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @ApiProperty()
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @ApiProperty({ enum: UserRole })
    @Column({ nullable: false, type: 'varchar', length: 20 })
    role: string;

    @Column({ nullable: false, default: true })
    status: boolean;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    confirmationToken: string;

    @Column({ nullable: true, type: 'varchar', length: 64 })
    recoverToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}