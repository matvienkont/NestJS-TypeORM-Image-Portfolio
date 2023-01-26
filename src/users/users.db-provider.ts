import { DataSource } from 'typeorm';
import { UserEntity } from './users.entity';
import { DBRepositories, DataSourceProvider } from '../constants';

export const userRepositoryProviders = [{
    provide: DBRepositories.user,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: [DataSourceProvider.dataSource],
}];