import { TYPE_VALUES } from 'src/constants/common.consts';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TYPE_VALUES,
    default: TYPE_VALUES[0],
  })
  type: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category_id, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
