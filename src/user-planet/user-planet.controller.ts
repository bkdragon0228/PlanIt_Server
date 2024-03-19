import { Controller, Post } from '@nestjs/common';
import { UserPlanetService } from './user-planet.service';
import { CreateUserPlanetDto } from 'src/models/dto/create-userPlanet.dto';
import { UserPlanet } from 'src/models/table/user-planet.entity';

@Controller('user-planet')
export class UserPlanetController {
  constructor(private readonly userPlantService: UserPlanetService) {}

  @Post()
  async createUserPlanet(
    createUserPlanetDto: CreateUserPlanetDto,
  ): Promise<UserPlanet> {
    return this.userPlantService.create(createUserPlanetDto);
  }
}
