import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DBRepositories } from '../constants';

@Injectable()
export class UsersService {
    constructor(@Inject(DBRepositories.user) private usersRepository: Repository<UserEntity>, ) {}

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            return undefined;
        }
        return user;
    }

    async create(userDto: CreateUserDto) {
        const { email } = userDto;

        const isValidEmail = this.validateEmail(email);
        if (!isValidEmail) {
            const errors = { email: 'Email is of invalid format' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        }

        let user: UserEntity | undefined = await this.findOneByEmail(email);
        if (user) {
            const errors = { email: 'User with this email has been alcomparePasswordsready registered' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        }

        user = this.usersRepository.create(userDto);
        await this.usersRepository.save(user);

        return user;
    }

    validateEmail(email: string) {
        return String(email)
            .toLowerCase()
            .match(
            // RFC 2822
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    }
}
