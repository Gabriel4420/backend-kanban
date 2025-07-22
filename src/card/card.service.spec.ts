import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { Column } from 'typeorm';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cards', async () => {
    const cards = await service.findAll();
    expect(cards).toBeInstanceOf(Array);
  });

  it('should create a new card', async () => {
    const newCard = {
      title: 'Test Card',
      description: 'Card Description',
      columnId: 1,
    };
    const createdCard = await service.create(newCard);
    expect(createdCard).toHaveProperty('id');
    expect(createdCard.title).toBe(newCard.title);
  });

  it('should find a card by id', async () => {
    const newCard = await service.create({
      title: 'Find Card',
      description: 'Description',
      columnId: 1,
    });
    const foundCard = await service.findOne(newCard.id);
    expect(foundCard).toHaveProperty('id', newCard.id);
  });

  it('should update a card', async () => {
    const newCard = await service.create({
      title: 'Update Card',
      description: 'Description',
      columnId: 1,
    });
    const updatedCard = await service.update(newCard.id, {
      title: 'Updated Title',
      description: 'Updated Description',
    });
    expect(updatedCard.title).toBe('Updated Title');
    expect(updatedCard.description).toBe('Updated Description');
  });

  it('should delete a card', async () => {
    const newCard = await service.create({
      title: 'Delete Card',
      description: 'Description',
      columnId: 1,
    });
    await service.delete(newCard.id);
    const deletedCard = await service.findOne(newCard.id);
    expect(deletedCard).toBeNull();
  });

  it('should move a card', async () => {
    const newCard = await service.create({
      title: 'Move Card',
      description: 'Description',
      columnId: 1,
    });
    const movedCard = await service.moveCard(newCard.id, 1, 2);
    expect(movedCard).toHaveProperty('id', newCard.id);
    expect(newCard.column.id).toBe(2);
  });
});
