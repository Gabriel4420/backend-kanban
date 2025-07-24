// card.entity.ts
import { Column } from 'src/column/column.entity';
import {
  Entity,
  Column as ORMColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ORMColumn()
  title: string;

  @ORMColumn()
  description: string;

  @ORMColumn({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => Column, (column) => column.cards)
  column: Column;

  @ORMColumn()
  columnId: number; // Foreign key to Column entity
}
