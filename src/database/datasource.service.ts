
import cfg from 'src/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from './snake-naming.strategy';

export default new DataSource({
    type: 'postgres',
    host: cfg.postgresHost,
    port: cfg.postgresPort,
    username: cfg.postgresUsername,
    password: cfg.postgresPassword,
    database: cfg.postgresDbName,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.js'],
    synchronize: false,
});
