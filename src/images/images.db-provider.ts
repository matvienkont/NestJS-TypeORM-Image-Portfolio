import { DataSource } from 'typeorm';
import { DBRepositories, DataSourceProvider } from '../constants';
import { ImageEntity } from './images.entity';
import { PortfolioEntity } from '../portfolios/portfolios.entity';

export const imageRepositoryProviders = [{
    provide: DBRepositories.image,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ImageEntity),
    inject: [DataSourceProvider.dataSource],
}, {
    provide: DBRepositories.portfolio,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PortfolioEntity),
    inject: [DataSourceProvider.dataSource],
}];