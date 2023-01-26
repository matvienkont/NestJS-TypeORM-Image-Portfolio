import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImageService } from './images.service';
import { imageRepositoryProviders } from './images.db-provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ImagesController],
    providers: [ImageService, ...imageRepositoryProviders]
})
export class ImageModule {}
