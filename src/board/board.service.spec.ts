import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board as KanbanBoard } from './board.entity';
import { Repository } from 'typeorm';

describe('ColumnService', () => {
  let service: BoardService;
  let repo: Repository<KanbanBoard>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BoardService>(BoardService);
    repo = module.get<Repository<KanbanBoard>>(getRepositoryToken(KanbanBoard));
  });

  it('Serviço deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('Deve retornar todos os boards', async () => {
    const boards = await service.findAll();
    expect(boards).toBeInstanceOf(Array);
  });

  it('Deve criar um novo board', async () => {
    const newBoard = { title: 'Test Board', description: 'Test Description' };
    const createdBoard = await service.create(newBoard);
    expect(createdBoard).toHaveProperty('id');
    expect(createdBoard.title).toBe(newBoard.title);
  });

  it('Deve achar um board pelo id', async () => {
    const newBoard = await service.create({
      title: 'Test Board',
      description: 'Test Description',
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newBoard);

    const foundBoard = await service.findOne(newBoard.id);

    expect(foundBoard).toHaveProperty('id', newBoard.id);
  });

  it('Deve atualizar um board', async () => {
    const newBoard = await service.create({
      title: 'Update Board',
      description: 'Update Description',
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newBoard);
    const updatedBoard = await service.update(newBoard.id, {
      title: 'Updated Name',
      description: 'Updated Description',
    });
    expect(updatedBoard.title).toBe('Updated Name');
  });

  it('deve remover um board', async () => {
    const newBoard = await service.create({
      title: 'Test Board',
      description: 'Test Description',
    });
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(newBoard);
    jest.spyOn(repo, 'remove').mockResolvedValue(newBoard);
    await service.remove(newBoard.id);
    const deletedBoard = await service.findOne(newBoard.id);
    expect(deletedBoard).toMatchObject({
      id: newBoard.id,
      name: 'Delete Board',
    });
  });
});
