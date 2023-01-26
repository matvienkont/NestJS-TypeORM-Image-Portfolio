import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
export class UsersController {
    constructor (private readonly usersServices: UsersService) {}

    @Post('users')
    async create(@Body('user') createUserDto: CreateUserDto) {
        return await this.usersServices.create(createUserDto);
    }
}