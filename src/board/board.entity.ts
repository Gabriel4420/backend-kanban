// board.entity.ts
import { Column } from '../column/column.entity';
import {
  Entity,
  Column as ORMColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @ORMColumn()
  title: string;

  @ORMColumn()
  description: string;

  @OneToMany(() => Column, (column) => column.board)
  columns: Column[];
}
