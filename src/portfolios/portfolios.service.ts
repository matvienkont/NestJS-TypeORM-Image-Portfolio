import { Inject, Injectable } from '@nestjs/common';
import { PortfolioEntity } from './portfolios.entity';
import { Repository } from 'typeorm';
import { DBRepositories } from 'src/constants';
import { UserEntity } from 'src/users/users.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfolioService {
    constructor(@Inject(DBRepositories.portfolio) private readonly portfolioRepository: Repository<PortfolioEntity>) {}

    async createPortfolio(createPortfolioDto: CreatePortfolioDto, user: UserEntity) {
        const newPortfolio = this.portfolioRepository.create({ ...createPortfolioDto, user });
        return await this.portfolioRepository.save(newPortfolio);
    }

    async getPortfolios(userId: number) {
        return await this.portfolioRepository.find({ relations: { images: true }, where: { user: userId } });
    }

    async deletePortfolio(portfolioId: number) {
        return await this.portfolioRepository.delete({ id: portfolioId });
    }

    async deleteProfile(userId: number) {
        return await this.portfolioRepository.delete({ user: userId });
    }
}