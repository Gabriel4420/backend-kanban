// src/column/dto/create-column.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
