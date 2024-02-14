import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { IsNotEmptyString } from 'src/decorators/is-not-empty-string.decorator';
import { WorkStatus } from '../common/work-status';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Planet } from './planet.entity';

@Entity()
export class Work extends TimeColumns {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmptyString(1, 15)
  @Column()
  public title: string;

  @IsNotEmpty()
  @Column()
  public planetId: string;

  @IsNotEmptyString(1, 50)
  @Column()
  public description: string;

  @Column()
  @IsEnum(WorkStatus)
  public status: WorkStatus;

  @ManyToOne(() => Planet)
  @JoinColumn({ name: 'planetId', referencedColumnName: 'id' })
  public planet: Planet;
}
