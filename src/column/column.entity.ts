// column.entity.ts
import { Board } from 'src/board/board.entity';
import { Card } from 'src/card/card.entity';
import {
  Entity,
  Column as ORMColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @ORMColumn()
  title: string;

  @ORMColumn({ nullable: true })
  description?: string;

  @ManyToOne(() => Board, (board) => board.columns)
  board: Board;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}
