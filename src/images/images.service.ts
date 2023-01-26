import { Inject, Injectable } from '@nestjs/common';
import { DBRepositories } from 'src/constants';
import { Repository } from 'typeorm';
import { ImageEntity } from './images.entity';
import { UserEntity } from 'src/users/users.entity';
import { AddImageDto } from './dto/add-image.dto';

@Injectable()
export class ImageService {
    constructor(@Inject(DBRepositories.image) private readonly imageRepository: Repository<ImageEntity>) {}

    async addImage(addImageDto: AddImageDto) {
        const newImage = this.imageRepository.create({ ...addImageDto });
        return await this.imageRepository.save(newImage);
    }

    async deleteImage(imageId: number) {
        return await this.imageRepository.delete({ id: imageId });
    }
}