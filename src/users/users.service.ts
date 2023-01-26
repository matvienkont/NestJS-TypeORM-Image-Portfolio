import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DBRepositories } from '../constants';
import { LoginUserDto } from './dto/login-user.dto';

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
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
}
