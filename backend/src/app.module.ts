/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperherosController } from './superheros/superheros.controller';
import { SuperherosModule } from './superheros/superheros.module';
import { PowersModule } from './powers/powers.module';
import { SuperherosService } from './superheros/superheros.service';
import { PowersService } from './powers/powers.service';
import { PowersController } from './powers/powers.controller';
import { Superhero } from './superheros/entities/superhero.entity';
import { Power } from './powers/entities/power.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mariadb",
      "host": "mariadb",
      "port": 3306,
      "username": "root",
      "password": "tu_contraseña",
      "database": "tu_base_de_datos",
      "entities": [Superhero, Power],
      "synchronize": true
    }),
    TypeOrmModule.forFeature([Superhero]),
    TypeOrmModule.forFeature([Power]),
    SuperherosModule,
    PowersModule,
  ],
  controllers: [AppController, SuperherosController, PowersController],
  providers: [AppService, SuperherosService, PowersService],
})
export class AppModule {}
