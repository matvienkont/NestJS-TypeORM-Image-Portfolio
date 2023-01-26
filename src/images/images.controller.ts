import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
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
    async addImage(@Body('image') addImageDto: AddImageDto) {
        const result = await this.imageService.addImage(addImageDto);
        return { msg: `Created with id: ${result.id}` };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:imageId')
    async deletePortfolio(@Param('imageId') imageId: number) {
        const result = await this.imageService.deleteImage(imageId);
        return { msg: `${result.affected} deleted` };
    }
}