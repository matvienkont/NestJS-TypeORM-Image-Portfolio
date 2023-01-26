import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { PortfolioModule } from '../portfolios/portfolios.module';
import { ImageModule } from 'src/images/images.module';

@Module({
    imports: [AuthModule, UserModule, PortfolioModule, ImageModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
