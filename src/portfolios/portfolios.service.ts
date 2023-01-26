import { BadRequestException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PortfolioEntity } from './portfolios.entity';
import { Repository } from 'typeorm';
import { DBRepositories, PostgresErrorCodes } from '../constants';
import { UserEntity } from '../users/users.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { CommonProvider } from '../common/common-error-handler.provider';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class PortfolioService {
    constructor(@Inject(DBRepositories.portfolio) private readonly portfolioRepository: Repository<PortfolioEntity>) {}

    async createPortfolio(createPortfolioDto: CreatePortfolioDto, user: UserEntity) {
        const funcName = '[PortfolioService.createPortfolio]';
        const newPortfolio = this.portfolioRepository.create({ ...createPortfolioDto, user });
        try {
            return await this.portfolioRepository.save(newPortfolio);
        } catch (err) {
            CommonProvider.handleError(err, funcName, { msg: `Portfolios have to be with unique names` });
        }
    }

    async getPortfolios(userId: number) {
        return await this.portfolioRepository.find({ relations: { images: true, user: true }, where: { user: { id: userId } } });
    }

    async deletePortfolio(portfolioId: number, userId: number) {
        const funcName = '[PortfolioService.deletePortfolio]';
        const result = await this.portfolioRepository.delete({ id: portfolioId, user: { id: userId } });
        if (!result.affected) {
            CommonProvider.handleError(new NotFoundException(), funcName, { msg: 'Portfolio id for this user was not found.' });
        }
        return result;
    }

    async deleteProfile(userId: number) {
        return await this.portfolioRepository.delete({ user: userId });
    }
}