// src/card/card.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { ColumnService } from '../column/column.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private columnService: ColumnService,
  ) {}

  findAll() {
    return this.cardRepository.find({ relations: ['column'] });
  }

  findOne(id: number): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async create(createCardDto: CreateCardDto) {
    const { columnId, ...cardData } = createCardDto;

    const column = await this.columnService.findOne(createCardDto.columnId);
    if (!column) throw new NotFoundException('Coluna não encontrada');

    const card = this.cardRepository.create({
      ...cardData,
      column, // Atribuindo a instância de Column ao card
    });

    return this.cardRepository.save(card);
  }

  async delete(id: number): Promise<void> {
    const card = await this.cardRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    await this.cardRepository.remove(card);
  }

  async moveCard(
    cardId: number,
    fromColumnId: number,
    toColumnId: number,
  ): Promise<Card | { message: string }> {
    let card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['column'],
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    } else if (card.column.id === fromColumnId) {
      card.column.id = toColumnId;
      await this.cardRepository.save(card);
    }

    if (card.column.id !== fromColumnId) {
      return { message: 'Card não pode ser movido para a coluna especificada' };
    }
    return card;
  }

  async update(
    id: number,
    updateCardDto: Partial<CreateCardDto>,
  ): Promise<Card> {
    const card = await this.cardRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    Object.assign(card, updateCardDto);
    return this.cardRepository.save(card);
  }
}
