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

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

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
  @UsePipes(ValidationPipe)
  createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }

  @Get()
  getMyInfo(@Req() req: Request) {
    const myId = req['user'].id;
    return this.userService.findUserById(myId);
  }

  @Put()
  @UsePipes(ValidationPipe)
  updateUserById(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req['user'].id;
    return this.updateUserById(userId, updateUserDto);
  }
}
