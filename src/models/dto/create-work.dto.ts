import { PickType } from '@nestjs/swagger';
import { Work } from '../table/work.entity';

export class CreateWorkDto extends PickType(Work, [
  'title',
  'description',
] as const) {}
