import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ImageService } from './images.service';
import { UserEntity } from '../users/users.entity';
import { User } from '../users/users.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AddImageDto } from './dto/add-image.dto';

@Controller('images')
export class ImagesController {
    constructor(private readonly imageService: ImageService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addImage(@Body('image') addImageDto: AddImageDto, @User('id') userId: number) {
        const result = await this.imageService.addImage(addImageDto, userId);
        return { msg: `Created with id: ${result.id}` };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:portfolioId/:imageId')
    async deleteImage(@User('id') userId: number, @Param('portfolioId', ParseIntPipe) portfolioId: number, @Param('imageId', ParseIntPipe) imageId: number) {
        const result = await this.imageService.deleteImage(userId, portfolioId, imageId);
        return { msg: `${result.affected} deleted` };
    }

    @UseGuards(JwtAuthGuard)
    @Get('feed')
    async getFeed(@User('id') userId: number) {
        const feed = await this.imageService.getFeed(userId);
        return feed;
    }
}