import { PickType } from '@nestjs/swagger';
import { Planet } from '../table/planet.entity';

export class CreatePlanetDto extends PickType(Planet, [
  'name',
  'description',
] as const) {}
