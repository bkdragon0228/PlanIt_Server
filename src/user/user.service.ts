import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/models/dto/creat-user.dto';
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
}
