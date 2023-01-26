import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolios.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../users/users.decorator';
import { UserEntity } from '../users/users.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Controller()
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @UseGuards(JwtAuthGuard)
    @Post('portfolio')
    async createPortfolio(@User() user: UserEntity, @Body('portfolio') createPortfolioDto: CreatePortfolioDto) {
        const portfolio = await this.portfolioService.createPortfolio(createPortfolioDto, user);
        return portfolio;
    }

    @UseGuards(JwtAuthGuard)
    @Get('portfolio')
    async getPortfolios(@User('id') userId: number) {
        const portfolios = await this.portfolioService.getPortfolios(userId);
        return portfolios;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('portfolio/:portfolioId')
    async deletePortfolio(@Param('portfolioId', ParseIntPipe) portfolioId: number, @User('id') userId: number) {
        const result = await this.portfolioService.deletePortfolio(portfolioId, userId);
        return { msg: `${result.affected} deleted` };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('profile')
    async deleteProfile(@User('id') userId: number) {
        const result = await this.portfolioService.deleteProfile(userId);
        return { msg: `Profile deleted. ${result.affected} portfolios were deleted.` };
    }
}
