import { DataSource } from 'typeorm';
import { PortfolioEntity } from './portfolios.entity';
import { DBRepositories, DataSourceProvider } from '../constants';

export const portfolioRepositoryProviders = [{
    provide: DBRepositories.portfolio,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PortfolioEntity),
    inject: [DataSourceProvider.dataSource],
}];