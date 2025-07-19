// src/column/column.controller.ts
import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }
  @Get(':id')
  findOne(id: number) {
    return this.boardService.findOne(id);
  }

  @Post()
  create(@Body() createColumnDto: CreateBoardDto) {
    return this.boardService.create(createColumnDto);
  }

  @Put('editBoard/:id')
  update(@Body() createColumnDto: CreateBoardDto, id: number) {
    return this.boardService.update(id, createColumnDto);
  }

  @Delete('removeBoard/:id')
  remove(id: number) {
    return this.boardService.remove(id);
  }
}
