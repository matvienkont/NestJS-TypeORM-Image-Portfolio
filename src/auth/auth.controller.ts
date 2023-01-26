import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-passport.guard';
import { Request } from 'express';
import { UserEntity } from 'src/users/users.entity';
import { User } from '../users/users.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@User() user: UserEntity) {
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('auth/logout')
    async logoug(@User() user: UserEntity) {
        return this.authService.logout(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@User() user: any) {
        return user;
    }
}