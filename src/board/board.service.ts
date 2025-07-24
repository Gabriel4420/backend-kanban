// src/column/column.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board as KanbanBoard } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(KanbanBoard)
    private boardRepository: Repository<KanbanBoard>,
  ) {}

  findAll() {
    return this.boardRepository.find();
  }

  findOne(id: number): Promise<KanbanBoard | null> {
    return this.boardRepository.findOneBy({ id });
  }

  create(createBoardDto: CreateBoardDto): Promise<KanbanBoard> {
    const column = this.boardRepository.create(createBoardDto);
    return this.boardRepository.save(column);
  }

  async update(
    id: number,
    createBoardDto: CreateBoardDto,
  ): Promise<KanbanBoard> {
    const column = await this.boardRepository.findOneBy({ id });
    if (!column) {
      throw new Error(`Board with id ${id} not found`);
    }
    Object.assign(column, createBoardDto);
    return this.boardRepository.save(column);
  }

  async remove(id: number) {
    const column = await this.boardRepository.findOneBy({ id });
    if (!column) {
      throw new Error(`Board with id ${id} not found`);
    }
    return this.boardRepository.remove(column);
  }
}
