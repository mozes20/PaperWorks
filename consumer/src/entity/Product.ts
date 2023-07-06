import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultTable } from './DefaultTable';
import { ElectricDevice } from 'src/data/ElectricDevice.data';

@Entity()
export class Product extends DefaultTable {
  @Column('simple-json', { nullable: true })
  product_info: ElectricDevice;
}
