import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KanbanColumn } from './column.entity';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([KanbanColumn])],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
