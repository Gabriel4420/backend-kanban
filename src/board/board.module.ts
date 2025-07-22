import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KanbanBoard } from './board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { KanbanColumn } from 'src/column/column.entity';
import { ColumnModule } from 'src/column/column.module';

@Module({
  imports: [TypeOrmModule.forFeature([KanbanBoard])],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService, BoardController],
  // Ensure both entities are exported
})
export class BoardsModule {}
