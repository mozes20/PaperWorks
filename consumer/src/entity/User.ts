import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  OneToMany,
} from 'typeorm';
import { ElectricDeviceEntity } from './ElectricDevices';
import { Product } from './Product';
import { GaratiPaper } from './Granati';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @OneToMany(() => ElectricDeviceEntity, (def) => def.shop_uuid)
  @OneToMany(() => Product, (def) => def.shop_uuid)
  @OneToMany(() => GaratiPaper, (def) => def.shop_uuid)
  uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
