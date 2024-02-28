import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/models/dto/creat-user.dto';
import { User } from 'src/models/table/user.entity';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { UpdateUserDto } from 'src/models/dto/update-user.dto';
import { UserDto } from 'src/models/dto/user.dto';
import { Serialize } from 'src/decorators/serialize';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/email/:email')
  @Serialize(UserDto)
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Serialize(UserDto)
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get('/check-email')
  async checkEmail(
    @Query('email') email: string,
  ): Promise<{ isDuplicate: boolean }> {
    const isDuplicate = await this.userService.checkDuplicateEmail(email);
    return { isDuplicate };
  }

  @IsPublic()
  @Post('/signup')
  @Serialize(UserDto)
  @UsePipes(ValidationPipe)
  createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }

  @Get()
  @Serialize(UserDto)
  getMyInfo(@Req() req: Request) {
    const myId = req['user'].id;
    return this.userService.findUserById(myId);
  }

  @Put()
  @UsePipes(ValidationPipe)
  @Serialize(UserDto)
  updateUserById(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req['user'].id;
    return this.userService.updateUserById(userId, updateUserDto);
  }
}
