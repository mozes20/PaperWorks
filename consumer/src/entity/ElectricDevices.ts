import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultTable } from './DefaultTable';

@Entity()
export class ElectricDeviceEntity extends DefaultTable {
  @Column()
  pruduct_name: string;

  @Column()
  product_type: string;

  @Column()
  product_code: string;

  @Column()
  product_factory: string;

  @Column()
  cpu: string;

  @Column()
  ram: string;

  @Column()
  storage: string;

  @Column()
  display: string;

  @Column()
  os: string;

  @Column()
  garanti_time: string;
}
