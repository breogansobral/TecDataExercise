/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SuperherosService } from './superheros.service';
import { Superhero } from './entities/superhero.entity';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheros')
export class SuperherosController {
  constructor(private readonly superherosService: SuperherosService) {}

  @Get()
  findAll(): Promise<Superhero[]> {
    // Endpoint para encontrar y devolver todos los superhéroes
    this.superherosService.findAll()
      .then(res => console.log(res))
    return this.superherosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Superhero> {
    // Endpoint para encontrar y devolver un superhéroe por su ID
    return this.superherosService.findOne(id);
  }

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superherosService.create(createSuperheroDto);
  }
}
