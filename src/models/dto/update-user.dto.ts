import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../table/user.entity';

export class UpdateUserDto extends PickType(PartialType(User), [
  'username',
  'email',
] as const) {}
