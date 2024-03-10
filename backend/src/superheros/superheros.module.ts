import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperherosController } from './superheros.controller';
import { Superhero } from './entities/superhero.entity';
import { SuperherosService } from './superheros.service';
import { Power } from 'src/powers/entities/power.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero, Power])],
  providers: [SuperherosService],
  controllers: [SuperherosController],
})
export class SuperherosModule {}
