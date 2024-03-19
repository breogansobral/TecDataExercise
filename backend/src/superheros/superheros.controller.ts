/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SuperherosService } from './superheros.service';
import { Superhero } from './entities/superhero.entity';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Controller('superheros')
export class SuperherosController {
  constructor(private readonly superherosService: SuperherosService) {}

  @Get()
  findAll(@Query('filter') filter: string): Promise<Superhero[]> {
      return this.superherosService.findAllFiltered(filter);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Superhero> {
    // Endpoint to find and return a superhero by his ID
    return this.superherosService.findOne(id);
  }

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superherosService.create(createSuperheroDto);
  }

  @Delete(':id')
  deleteSuperhero(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.superherosService.delete(id);
  }

  @Patch(':id')
  async updateSuperhero(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ): Promise<Superhero> {
    return this.superherosService.updateSuperhero(id, updateSuperheroDto);
  }

}
