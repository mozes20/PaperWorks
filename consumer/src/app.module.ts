import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgDataSource } from './pgdatasource';
import { User } from './entity/User';
import { UserModule } from './user/user.module';
import { GaratiPaper } from './entity/Granati';
import { Product } from './entity/Product';
import { ElectricDeviceEntity } from './entity/ElectricDevices';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'any_name_i_want',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'any_client_id_i_want',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'an_unique_string_id',
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'paperwork',
      password: 'paperwork',
      database: 'default_database',
      entities: [User, GaratiPaper, Product, ElectricDeviceEntity],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
