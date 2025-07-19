import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { ColumnModule } from '../column/column.module'; // Importação do módulo de coluna

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    ColumnModule, // Adicione aqui!
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
