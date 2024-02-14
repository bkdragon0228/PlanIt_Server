import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/models/table/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/models/dto/creat-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: Partial<Repository<User>>;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('UserService 인스턴스가 생성된다.', async () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('알맞은 데이터를 제공하면 유저를 생성한다.', async () => {
      const createUserDto = {
        email: 'test@test.com',
        password: '1234567a!',
        username: 'test user',
      };

      const user = new User();
      user.id = '1';
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.username = createUserDto.username;

      jest.spyOn(mockUserRepository, 'create').mockReturnValue(user);
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(user);

      const result = await userService.create(createUserDto);

      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findOneByEmail', () => {
    it('존재 하지 않은 이메일을 제공하면 NotFound 에외가 발생한다.', async () => {
      const wrongEmail = 'wrong@test.com';

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);

      await expect(userService.findOneByEmail(wrongEmail)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('존재 하는 이메일을 제공하면 알맞은 유저를 제공한다.', async () => {
      const email = 'test@test.com';
      const user = new User();
      user.email = email;

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.findOneByEmail(email);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
        relations: { userPlants: true },
      });
      expect(result.email).toBe(email);
    });
  });

  describe('findUserById', () => {
    //findOneByEmail 과 같은 로직이여서 생략
  });

  describe('updateUserById', () => {
    it('유효하지 않은 id를 제공할 경우 NotFound 에외가 발생한다.', async () => {
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);

      await expect(userService.updateUserById('wrongId', {})).rejects.toThrow(
        NotFoundException,
      );
    });

    it('유저 정보가 올바르게 업데이트 된다.', async () => {
      const id = '1';
      const updateUserDto = {
        email: 'new@test.com',
        username: 'new',
      };

      const user = new User();
      user.id = '1';
      user.email = updateUserDto.email;
      user.username = updateUserDto.username;

      jest.spyOn(userService, 'findUserById').mockResolvedValue(user);
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(user);

      const result = await userService.updateUserById(id, updateUserDto);

      expect(result).toEqual(user);
    });
  });

  describe('checkDuplicateEmail', () => {
    it('이미 있는 이메일을 제공한 경우 true를 반환한다.', async () => {
      const duplicateEmail = 'duplicateEmail@test.com';
      const user = new User();
      user.email = duplicateEmail;

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.checkDuplicateEmail(duplicateEmail);

      expect(result).toBe(true);
    });
    it('존재 하지 않는 이메일을 제공한 경우 false 반환한다.', async () => {
      const notDuplicateEmail = 'notDuplicateEmail@test.com';
      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);

      const result = await userService.checkDuplicateEmail(notDuplicateEmail);

      expect(result).toBe(false);
    });
  });
});
