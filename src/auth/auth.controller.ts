import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInDto } from 'src/models/dto/sign-in.dto';
import { AuthService } from './auth.service';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { CreateUserDto } from 'src/models/dto/creat-user.dto';
import { User } from 'src/models/table/user.entity';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @IsPublic()
  @Post('sing-up')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }
}
