// create-column.dto.ts
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  boardId: number; // Relacionamento com o board
}
