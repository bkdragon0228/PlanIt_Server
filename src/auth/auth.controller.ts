import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/models/dto/sign-in.dto';
import { AuthService } from './auth.service';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
