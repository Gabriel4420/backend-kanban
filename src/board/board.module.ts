import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KanbanBoard } from './board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([KanbanBoard])],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardsModule {}
