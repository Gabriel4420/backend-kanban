import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KanbanBoard } from './board.entity';
import { BoardService } from './board.service';

describe('BoardController', () => {
  let controller: BoardController;
  let repo: Repository<KanbanBoard>;
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(KanbanBoard),
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

    controller = module.get<BoardController>(BoardController);
    repo = module.get<Repository<KanbanBoard>>(getRepositoryToken(KanbanBoard));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all boards', async () => {
    const boards = await controller.findAll();
    expect(boards).toBeInstanceOf(Array);
  });

  it('should create a new board', async () => {
    const newBoard = { name: 'Test Board' };
    const createdBoard = await controller.create(newBoard);
    expect(createdBoard).toHaveProperty('id');
    expect(createdBoard.name).toBe(newBoard.name);
  });

  it('should find a board by id', async () => {
    const newBoard = await controller.create({ name: 'Find Board' });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newBoard);

    const foundBoard = await controller.findOne(newBoard.id);

    expect(foundBoard).toHaveProperty('id', newBoard.id);
  });

  it('should update a board', async () => {
    const newBoard = await controller.create({ name: 'Update Board' });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newBoard);
    const updatedBoard = await controller.update(
      { name: 'Updated Name' },
      newBoard.id,
    );

    expect(updatedBoard).toHaveProperty('id', newBoard.id);
    expect(updatedBoard.name).toBe('Updated Name');
  });
});
