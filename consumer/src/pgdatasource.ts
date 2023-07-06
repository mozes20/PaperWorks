/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export class PgDataSource{
    AppDataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'test',
        password: 'test',
        database: 'test',
        synchronize: true,
        logging: true,
        entities: [],
        subscribers: [],
        migrations: [],
      });
}

