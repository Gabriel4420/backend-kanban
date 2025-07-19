// src/column/dto/create-column.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
