// src/card/card.controller.ts
import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ColumnService } from '../column/column.service';

@Controller('cards')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly columnService: ColumnService, // Injetando o serviço de Column
  ) {}

  @Get()
  findAll() {
    return this.cardService.findAll();
  }
  @Get(':id')
  findOne(id: number) {
    return this.cardService.findOne(id);
  }

  @Delete(':id')
  async delete(id: number) {
    return this.cardService.delete(id);
  }
  // Método para criar um card
  // Atribuindo a instância de Column ao card
  // e não apenas o columnId
  
  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    // Encontrar a instância da Column com o columnId
    const column = await this.columnService.findOne(createCardDto.columnId);

    // Verifica se a coluna foi encontrada
    if (!column) {
      throw new Error('Column not found');
    }
    // Criar o card associando a instância de Column
    return this.cardService.create({
      ...createCardDto,
      columnId: column.id, // Atribui apenas o id da coluna ao card
    });
  }
  @Put('move')
  async moveCard(
    @Body() body: { cardId: number; fromColumnId: number; toColumnId: number },
  ) {
    const { cardId, fromColumnId, toColumnId } = body;
    return this.cardService.moveCard(cardId, fromColumnId, toColumnId);
  }
}
