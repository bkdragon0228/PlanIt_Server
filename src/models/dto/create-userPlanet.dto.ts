import { PickType } from '@nestjs/swagger';
import { UserPlanet } from '../table/user-planet.entity';
import { IsNotEmptyString } from 'src/decorators/is-not-empty-string.decorator';
import { IsOptional } from 'class-validator';

export class CreateUserPlanetDto extends PickType(UserPlanet, [
  'userId',
  'avatarUrl',
]) {
  @IsNotEmptyString(2, 50)
  public planetName: string;

  @IsOptional()
  public planetDescription: string;
}
