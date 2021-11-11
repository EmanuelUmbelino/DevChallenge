import {
    Injectable,
    UnprocessableEntityException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-users.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException(['Passwords do not match']);
        } else {
            return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
        }
    }

    async findUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId, {
            select: ['id', 'email', 'name', 'role'],
        });

        if (!user) throw new NotFoundException(['User not found']);

        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
        const result = await this.userRepository.update({ id }, updateUserDto);
        if (result.affected > 0) {
            const user = await this.findUserById(id);
            return user;
        } else {
            throw new NotFoundException(['User not found']);
        }
    }

    async changePassword(changePasswordDto: ChangePasswordDto, id: string): Promise<void> {
        const { newPassword, passwordConfirmation } = changePasswordDto;

        if (newPassword != passwordConfirmation)
            throw new UnprocessableEntityException(['Passwords do not match']);

        const user = await this.userRepository.checkCredentials(changePasswordDto);

        if (user === null) {
            throw new UnauthorizedException(['Invalid credentials']);
        }

        await this.userRepository.changePassword(id, newPassword);
    }

    async deleteUser(userId: string) {
        const result = await this.userRepository.delete({ id: userId });
        if (result.affected === 0) {
            throw new NotFoundException(['Not found a user with the given ID'],);
        }
    }
}