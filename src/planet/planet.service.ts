import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from 'src/models/table/planet.entity';
import { Repository } from 'typeorm';
import { CreatePlanetDto } from 'src/models/dto/create-planet.dto';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
  ) {}

  public async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return this.planetRepository.save(createPlanetDto);
  }
}
