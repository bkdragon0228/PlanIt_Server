import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/models/dto/creat-user.dto';
import { User } from 'src/models/table/user.entity';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('/signup')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }
}
