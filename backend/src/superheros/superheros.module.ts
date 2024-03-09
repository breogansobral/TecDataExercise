import { Module } from '@nestjs/common';
import { SuperherosService } from './superheros.service';

@Module({
  providers: [SuperherosService],
})
export class SuperherosModule {}
