import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { DatabaseModule } from '../database/database.module';
import { userRepositoryProviders } from './users.db-provider';
import { UsersController } from './users.controller';

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...userRepositoryProviders],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UserModule {}
