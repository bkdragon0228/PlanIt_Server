import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/models/table/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('Auth Service 인스턴스가 생성된다.', async () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('존재하지 않는 email을 제공하면 NotFoundException 예외를 던진다.', async () => {
      const signInDto = {
        email: 'nonexistent@gmail.com',
        password: 'password',
      };
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('잘못된 비밀번호를 제공하면 UnauthorizedException 예외를 던진다.', async () => {
      const signInDto = { email: 'user@gmail.com', password: 'wrongPassword' };
      const user = new User();
      user.email = 'user@gmail.com';
      user.password = 'correctPassword';

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('올바른 비밀번호와 이메일을 제공하면 access token을 제공한다.', async () => {
      const signInDto = {
        email: 'user@gmail.com',
        password: 'correctPassword',
      };
      const user = new User();
      user.email = 'user@gmail.com';
      user.password = 'correctPassword';

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('testAccessToken');

      const result = await authService.signIn(signInDto);

      expect(result).toHaveProperty('access_token');
      expect(result['access_token']).toBe('testAccessToken');
    });
  });
});
