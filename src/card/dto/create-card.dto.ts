// src/card/dto/create-card.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional() // A descrição é opcional
  description?: string;

  @IsInt()
  @IsNotEmpty()
  columnId: number; // Passamos o columnId como número aqui
}
