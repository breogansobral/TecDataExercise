/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperherosController } from './superheros/superheros.controller';
import { SuperherosModule } from './superheros/superheros.module';
import { PowersModule } from './powers/powers.module';

@Module({
  imports: [TypeOrmModule.forRoot(), SuperherosModule, PowersModule],
  controllers: [AppController, SuperherosController],
  providers: [AppService],
})
export class AppModule {}
