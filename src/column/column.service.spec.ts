import { Test, TestingModule } from '@nestjs/testing';
import { ColumnService } from './column.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Column as KanbanColumn } from './column.entity';
import { Repository } from 'typeorm';

describe('ColumnService', () => {
  let service: ColumnService;
  let repo: Repository<KanbanColumn>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColumnService,
        {
          provide: getRepositoryToken(KanbanColumn),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest
              .fn()
              .mockImplementation((column) => ({ id: 1, ...column })),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ColumnService>(ColumnService);
    repo = module.get<Repository<KanbanColumn>>(
      getRepositoryToken(KanbanColumn),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all columns', async () => {
    const columns = await service.findAll();
    expect(columns).toBeInstanceOf(Array);
  });

  it('should create a new column', async () => {
    const newColumn = { title: 'Test Column', description: 'x', boardId: 1 };
    const createdColumn = await service.create(newColumn);
    expect(createdColumn).toHaveProperty('id');
    expect(createdColumn.title).toBe(newColumn.title);
  });

  it('should find a column by id', async () => {
    const newColumn = await service.create({
      title: 'Test Column',
      description: 'x',
      boardId: 1,
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newColumn);
    const foundColumn = await service.findOne(newColumn.id);
    expect(foundColumn).toHaveProperty('id', newColumn.id);
  });

  it('should update a column', async () => {
    const newColumn = await service.create({
      title: 'Update Column',
      boardId: 1,
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newColumn);
    jest.spyOn(repo, 'save').mockResolvedValue({
      ...newColumn,
      title: 'Updated Name',
    });
    const updatedColumn = await service.update(newColumn.id, {
      title: 'Updated Name',
      boardId: 1,
    });
    expect(updatedColumn.title).toBe('Updated Name');
  });

  it('should delete a column', async () => {
    const newColumn = await service.create({
      title: 'Delete Column',
      boardId: 1,
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newColumn);
    jest.spyOn(repo, 'remove').mockResolvedValue(newColumn);
    await service.remove(newColumn.id);
    const deletedColumn = await service.findOne(newColumn.id);
    expect(deletedColumn).toBeNull();
  });

  it('should throw an error when trying to update a non-existing column', async () => {
    await expect(
      service.update(999, { title: 'Non-existing Column', boardId: 1 }),
    ).rejects.toThrow();
  });
});
