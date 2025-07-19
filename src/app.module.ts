import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Card } from './card/card.entity';
import { KanbanColumn } from './column/column.entity';
import { CardModule } from './card/card.module';
import { ColumnModule } from './column/column.module';
import { KanbanBoard } from './board/board.entity';
import { BoardsModule } from './board/board.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // ou outro banco de dados que você esteja usando
      database: 'kanban.db',
      entities: [Card, KanbanColumn, KanbanBoard],
      synchronize: true,
    }),
    CardModule,
    ColumnModule,
    BoardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
