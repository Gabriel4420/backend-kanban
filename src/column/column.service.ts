// src/column/column.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Column)
    private columnRepository: Repository<Column>,
  ) {}

  findAll() {
    return this.columnRepository.find();
  }

  findOne(id: number): Promise<Column | null> {
    return this.columnRepository.findOneBy({ id });
  }

  create(createColumnDto: CreateColumnDto) {
    const column = this.columnRepository.create(createColumnDto);
    return this.columnRepository.save(column);
  }

  async update(id: number, createColumnDto: CreateColumnDto) {
    const column = await this.columnRepository.findOneBy({ id });
    if (!column) {
      throw new Error(`Column with id ${id} not found`);
    }
    Object.assign(column, createColumnDto);
    return this.columnRepository.save(column);
  }

  async remove(id: number) {
    const column = await this.columnRepository.findOneBy({ id });
    if (!column) {
      throw new Error(`Column with id ${id} not found`);
    } 
    return this.columnRepository.remove(column);
  }
}
