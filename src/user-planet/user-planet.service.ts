import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPlanetDto } from 'src/models/dto/create-userPlanet.dto';
import { UserPlanet } from 'src/models/table/user-planet.entity';
import { PlanetService } from 'src/planet/planet.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserPlanetService {
  constructor(
    @InjectRepository(UserPlanet)
    private readonly userPlanetRepository: Repository<UserPlanet>,
    private readonly planetService: PlanetService,
    private readonly userService: UserService,
  ) {}

  public async create(
    createUserPlanetDto: CreateUserPlanetDto,
  ): Promise<UserPlanet> {
    const { userId, avatarUrl, planetDescription, planetName } =
      createUserPlanetDto;
    const user = await this.userService.findUserById(userId);

    const planet = await this.planetService.create({
      description: planetDescription,
      name: planetName,
    });

    const newUserPlanet = new UserPlanet();

    newUserPlanet.avatarUrl = avatarUrl;
    newUserPlanet.planet = planet;
    newUserPlanet.user = user;

    return this.userPlanetRepository.save(newUserPlanet);
  }
}
