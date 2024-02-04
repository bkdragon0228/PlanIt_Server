import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/models/dto/creat-user.dto';
import { UpdateUserDto } from 'src/models/dto/update-user.dto';
import { User } from 'src/models/table/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    const { email, password, username } = createUser;
    const user = this.userRepository.create({ email, password, username });

    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { username, email } = updateUserDto;
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    const result = await this.userRepository.save(user);

    return result;
  }

  async checkDuplicateEmail(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    return !!existingUser;
  }
}
