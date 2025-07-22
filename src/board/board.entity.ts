import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { KanbanColumn } from 'src/column/column.entity';

@Entity()
export class KanbanBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => KanbanColumn, (board) => board.board)
  columns: KanbanColumn[];
}
export { KanbanBoard as Column }; // Exportando como Column para manter a consistência com o resto do código
