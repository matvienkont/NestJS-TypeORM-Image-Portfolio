import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import cfg from '../config';
import { LocalAuthGuard } from './guards/local-passport.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: cfg.jwtSecret,
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}