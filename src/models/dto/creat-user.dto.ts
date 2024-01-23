import { User } from '../table/user.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(User, [
  'username',
  'email',
  'password',
] as const) {}
