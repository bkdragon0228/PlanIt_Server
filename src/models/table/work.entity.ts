import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { User } from './user.entity';
import { IsNotEmptyString } from 'src/decorators/is-not-empty-string.decorator';
import { WorkStatus } from '../common/work-status';
import { IsEnum, IsOptional } from 'class-validator';

@Entity()
export class Work extends TimeColumns {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmptyString(1, 50)
  @Column()
  public title: string;

  @Column()
  public userId: string;

  @IsOptional()
  @Column({ nullable: true })
  public description: string;

  @Column()
  @IsEnum(WorkStatus)
  public status: WorkStatus;

  @ManyToOne(() => User, (user) => user.works)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user: User;
}
