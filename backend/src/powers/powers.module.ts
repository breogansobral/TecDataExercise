import { Module } from '@nestjs/common';
import { PowersService } from './powers.service';

@Module({
  providers: [PowersService],
})
export class PowersModule {}
