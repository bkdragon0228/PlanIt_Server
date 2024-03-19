import { Module } from '@nestjs/common';
import { UserPlanetController } from './user-planet.controller';
import { UserPlanetService } from './user-planet.service';
import { Planet } from 'src/models/table/planet.entity';
import { PlanetModule } from 'src/planet/planet.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [UserPlanetController],
  providers: [UserPlanetService],
  imports: [PlanetModule, UserModule],
})
export class UserPlanetModule {}
