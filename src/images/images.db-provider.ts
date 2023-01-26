import { DataSource } from 'typeorm';
import { DBRepositories, DataSourceProvider } from '../constants';
import { ImageEntity } from './images.entity';

export const imageRepositoryProviders = [{
    provide: DBRepositories.image,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ImageEntity),
    inject: [DataSourceProvider.dataSource],
}];