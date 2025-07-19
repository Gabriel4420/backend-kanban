// src/column/column.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KanbanBoard as Column } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Column)
    private boardRepository: Repository<Column>,
  ) {}

  findAll() {
    return this.boardRepository.find();
  }

  findOne(id: number): Promise<Column | null> {
    return this.boardRepository.findOneBy({ id });
  }

  create(createColumnDto: CreateBoardDto): Promise<Column> {
    const column = this.boardRepository.create(createColumnDto);
    return this.boardRepository.save(column);
  }

  async update(id: number, createColumnDto: CreateBoardDto): Promise<Column> {
    const column = await this.boardRepository.findOneBy({ id });
    if (!column) {
      throw new Error(`Board with id ${id} not found`);
    }
    Object.assign(column, createColumnDto);
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
