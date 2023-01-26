import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolios.service';
import { PortfolioController } from './portfolios.controller';
import { portfolioRepositoryProviders } from './portfolio.db-provider';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [PortfolioService, ...portfolioRepositoryProviders],
    controllers: [PortfolioController]
})
export class PortfolioModule {}
