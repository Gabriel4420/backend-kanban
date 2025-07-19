// src/column/column.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Card } from '../card/card.entity';
import { KanbanBoard } from 'src/board/board.entity';

@Entity()
export class KanbanColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];

  @ManyToOne(() => KanbanBoard, (boards: any) => boards.columns, {
    eager: true,
  })

  board: KanbanBoard; // A associação é feita com a instância de Column
}
export { KanbanColumn as Column }; // Exportando como Column para manter a consistência com o resto do código

