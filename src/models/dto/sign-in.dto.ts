import { PickType } from '@nestjs/swagger';
import { User } from '../table/user.entity';

export class SignInDto extends PickType(User, ['email', 'password'] as const) {}
