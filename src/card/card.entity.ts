// src/card/card.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { KanbanColumn } from '../column/column.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // A coluna aqui é uma instância de KanbanColumn, e não apenas o ID
  @ManyToOne(() => KanbanColumn, (column:any) => column.cards, { eager: true })
  column: KanbanColumn; // A associação é feita com a instância de Column
}
