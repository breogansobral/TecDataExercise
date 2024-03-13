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

  // Assumes we want to allow updating of proxies by IDs.
  @IsOptional()
  @IsArray()
  readonly powers?: string[];
}

