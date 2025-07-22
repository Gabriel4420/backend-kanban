import { Test, TestingModule } from '@nestjs/testing';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KanbanColumn } from './column.entity';
import { Repository } from 'typeorm';

describe('ColumnController', () => {
  let controller: ColumnController;
  let repo: Repository<KanbanColumn>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColumnController],
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
        {
          provide: getRepositoryToken(KanbanColumn),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest
              .fn()
              .mockImplementation((board) => ({ id: 1, ...board })),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ColumnController>(ColumnController);
    repo = module.get<Repository<KanbanColumn>>(
      getRepositoryToken(KanbanColumn),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all columns', async () => {
    const columns = await controller.findAll();
    expect(columns).toBeInstanceOf(Array);
  });

  it('should create a new column', async () => {
    const newColumn = { name: 'Test Column', boardId: 1 };
    const createdColumn = await controller.create(newColumn);
    expect(createdColumn).toHaveProperty('id');
    expect(createdColumn.name).toBe(newColumn.name);
  });

  it('should find a column by id', async () => {
    const newColumn = await controller.create({
      name: 'Find Column',
      boardId: 1,
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newColumn);

    const foundColumn = await controller.findOne(newColumn.id);

    expect(foundColumn).toHaveProperty('id', newColumn.id);
  });

  it('should update a column', async () => {
    const newColumn = await controller.create({
      name: 'Update Column',
      boardId: 1,
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newColumn);
    jest.spyOn(repo, 'save').mockResolvedValue({
      ...newColumn,
      name: 'Updated Name',
    });

    const updatedColumn = await controller.update(
      {
        name: 'Updated Name',
        boardId: 1,
      },
      newColumn.id,
    );

    expect(updatedColumn).toHaveProperty('name', 'Updated Name');
  });

  it('should delete a column', async () => {
    const newColumn = await controller.create({
      name: 'Delete Column',
      boardId: 1,
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newColumn);
    jest.spyOn(repo, 'remove').mockResolvedValue(newColumn);

    await controller.remove(newColumn.id);

    const deletedColumn = await controller.findOne(newColumn.id);
    jest.spyOn(repo, 'remove').mockResolvedValue(newColumn);
    expect(deletedColumn).toBeNull();
  });

  it('should handle errors when finding a column by id', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
    const foundColumn = await controller.findOne(999); // Non-existent ID
    expect(foundColumn).toBeNull();
  });
});
