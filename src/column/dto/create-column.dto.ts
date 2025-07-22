// src/column/dto/create-column.dto.ts
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  boardId: number;
}
