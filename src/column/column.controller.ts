// src/column/column.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  findAll() {
    return this.columnService.findAll();
  }
  @Get(':id')
  findOne(id: number) {
    return this.columnService.findOne(id);
  }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }

  @Put('editColumn/:id')
  update(@Body() createColumnDto: CreateColumnDto, @Param('id') id: number) {
    return this.columnService.update(id, createColumnDto);
  }

  @Delete('removeColumn/:id')
  remove(@Param('id') id: number) {
    return this.columnService.remove(id);
  }
}
