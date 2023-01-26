
import { DataSourceProvider } from '../constants';
import DataSource from './datasource.service';

export const databaseProviders = [{
    provide: DataSourceProvider.dataSource,
    useFactory: async () => DataSource.initialize(),
}];
