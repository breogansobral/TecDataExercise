/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Superhero } from './entities/superhero.entity';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Power } from 'src/powers/entities/power.entity';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Injectable()
export class SuperherosService {
  constructor(
    @InjectRepository(Superhero)
    private superheroRepository: Repository<Superhero>,
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
    private connection: Connection // Inyecta Connection para usar transacciones
  ) {}

  async create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    return await this.connection.transaction(async manager => {
      const superhero = manager.create(Superhero, {
        name: createSuperheroDto.name,
        element: createSuperheroDto.element,
        color: createSuperheroDto.color,
        age: createSuperheroDto.age,
        place: createSuperheroDto.place,
        img: createSuperheroDto.img,
      });

      await manager.save(superhero);

      const powersPromises = createSuperheroDto.powers.map(async (powerName) => {
        const power = new Power();
        power.power = powerName;
        power.superhero = superhero;
        return manager.save(power);
      });

      await Promise.all(powersPromises);

      // Usar findOne para recargar la entidad Superhero y sus relaciones
      const reloadedSuperhero = await manager.findOne(Superhero, {
        where: { id: superhero.id },
        relations: ["powers"]
      });

      return reloadedSuperhero;
    });
  }

  async updateSuperhero(id: number, updateSuperheroDto: UpdateSuperheroDto): Promise<Superhero> {
    const superhero = await this.superheroRepository.findOneBy({ id });
    if (!superhero) {
      throw new NotFoundException(`Superhero with ID "${id}" not found`);
    }

    const { name, element, color, age, place, img, powers } = updateSuperheroDto;

    if (name) superhero.name = name;
    if (element) superhero.element = element;
    if (color) superhero.color = color;
    if (age) superhero.age = age;
    if (place) superhero.place = place;
    if (img) superhero.img = img;

    if (powers) {

      await this.deletePowerBySuperheroId(id);
      await this.connection.transaction(async manager => {

        const powersPromises = updateSuperheroDto.powers.map(async (powerName) => {
          const power = new Power();
          power.power = powerName;
          power.superhero = superhero;
          return manager.save(power);
        });

        await Promise.all(powersPromises);
      })
    }

    await this.superheroRepository.save(superhero);

    return superhero;
  }

  async deletePowerBySuperheroId(superheroId: number): Promise<void> {
    const deleteResult = await this.powerRepository.delete({superhero: { id: superheroId}});

    if(deleteResult.affected === 0) {
      throw new NotFoundException(`Powers width superheroId: ${superheroId} not found`);
    }
  }


  async delete(id: number): Promise<void> {
    const result = await this.superheroRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Superhero with ID "${id}" not found`);
    }
  }

  async findAll(): Promise<Superhero[]> {
    // No changes needed here
    return await this.superheroRepository.find({ relations: ['powers'] });
  }

  async findOne(id: number): Promise<Superhero> {
    // Updated to match TypeORM method signature
    const superhero = await this.superheroRepository.findOne({
      where: { id }, // Specify the search condition
      relations: ['powers'], // Include relations in the result
    });

    if (!superhero) {
      throw new NotFoundException(`Superhero with ID '${id}' not found.`);
    }
    return superhero;
  }


}
