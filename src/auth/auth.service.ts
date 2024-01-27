import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from 'src/models/dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<Record<string, any>> {
    const { email, password } = signInDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException(`${user.email}, ${password}`);
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
