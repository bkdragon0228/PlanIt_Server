import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/models/dto/creat-user.dto';
import { User } from 'src/models/table/user.entity';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { UpdateUserDto } from 'src/models/dto/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/models/dto/user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/email/:email')
  @UseInterceptors(new SerializeInterceptor(UserDto))
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
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
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @UsePipes(ValidationPipe)
  createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }

  @Get()
  @UseInterceptors(new SerializeInterceptor(UserDto))
  getMyInfo(@Req() req: Request) {
    const myId = req['user'].id;
    return this.userService.findUserById(myId);
  }

  @Put()
  @UsePipes(ValidationPipe)
  @UseInterceptors(new SerializeInterceptor(UserDto))
  updateUserById(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req['user'].id;
    return this.userService.updateUserById(userId, updateUserDto);
  }
}
