/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsInt, IsArray, Min, IsUrl } from 'class-validator';

export class UpdateSuperheroDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly element?: string;

  @IsOptional()
  @IsString()
  readonly color?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly age?: number;

  @IsOptional()
  @IsString()
  readonly place?: string;

  @IsOptional()
  @IsUrl()
  readonly img?: string;

  // Asume que queremos permitir actualizar los poderes por IDs
  @IsOptional()
  @IsArray()
  readonly powers?: string[];
}

