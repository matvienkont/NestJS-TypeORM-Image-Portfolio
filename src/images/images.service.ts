import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DBRepositories } from '../constants';
import { Repository } from 'typeorm';
import { ImageEntity } from './images.entity';
import { UserEntity } from '../users/users.entity';
import { AddImageDto } from './dto/add-image.dto';
import { CommonProvider } from '../common/common-error-handler.provider';
import { PortfolioEntity } from 'src/portfolios/portfolios.entity';

@Injectable()
export class ImageService {
    constructor(
        @Inject(DBRepositories.image) private readonly imageRepository: Repository<ImageEntity>,
        @Inject(DBRepositories.portfolio) private readonly portfolioRepository: Repository<PortfolioEntity>
    ) {}

    async addImage(addImageDto: AddImageDto, userId: number) {
        const funcName = '[ImageService.addImage]';
        try {
            const { portfolio: portfolioId } = addImageDto;
            const portfolio = await this.portfolioRepository.findOne({ relations: { user: true }, where: { id: portfolioId, user: { id: userId } }});

            if (portfolio) {
                const newImage = this.imageRepository.create({ ...addImageDto });
                return await this.imageRepository.save(newImage);
            } else {
                CommonProvider.handleError(new NotFoundException(), funcName, { msg: 'Provided portfolio id was not found for this user' });
            }
        } catch (err) {
            CommonProvider.handleError(err, funcName, { msg: 'Provided portfolio id does not exist' });
        }
    }

    async deleteImage(userId: number, portfolioId: number, imageId: number) {
        const funcName = '[ImageService.addImage]';
        try {
            const portfolio = await this.portfolioRepository.findOne({ relations: { user: true, images: true }, where: { id: portfolioId, user: { id: userId }, images: { id: imageId } }});

            if (portfolio) {
                return await this.imageRepository.delete({ id: imageId });
            } else {
                CommonProvider.handleError(new NotFoundException(), funcName, { msg: 'Provided portfolio id was not found for this user' });
            }
        } catch (err) {
            CommonProvider.handleError(err, funcName, { msg: 'Provided portfolio id does not exist' });
        }
    }

    async getFeed(userId: number) {
        const portfolios = await this.portfolioRepository.find({
            relations: { images: true },
            where: { user: userId },
            select: { id: true, name: true, images: true },
            take: 20,
            order: { images: { createdAt: 'DESC'}}
        });
        const feed = [];
        portfolios.forEach(portfolio => {
            portfolio.images.forEach(image => {
                const { imageUrl, name, description } = image;
                feed.push({ imageUrl, name, description, portfolioName: portfolio.name, });
            });
        });
        return feed;
    }
}