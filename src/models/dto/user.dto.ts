import { Expose } from 'class-transformer';
import { User } from '../table/user.entity';
import { PickType } from '@nestjs/swagger';

export class UserDto extends PickType(User, [
  'id',
  'username',
  'email',
  'userPlants',
] as const) {}
