import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from 'src/models/dto/sign-in.dto';
import { User } from 'src/models/table/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<Record<string, any>> {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({ where: { email } });

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
