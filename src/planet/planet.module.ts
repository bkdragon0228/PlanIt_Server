import { Module } from '@nestjs/common';
import { PlanetController } from './planet.controller';
import { PlanetService } from './planet.service';

@Module({
  controllers: [PlanetController],
  providers: [PlanetService],
  exports: [PlanetService],
})
export class PlanetModule {}
