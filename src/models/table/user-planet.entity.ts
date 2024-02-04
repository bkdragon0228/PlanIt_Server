import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { User } from './user.entity';
import { Planet } from './planet.entity';
import { IsNotEmpty } from 'class-validator';
import { Avatar } from './avatar.entity';

@Entity()
export class UserPlanet extends TimeColumns {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column()
  public userId: string;

  @IsNotEmpty()
  @Column()
  public planetId: string;

  @OneToOne(() => Avatar, { cascade: true })
  @JoinColumn()
  public avatar: Avatar;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user: User;

  @ManyToOne(() => Planet)
  @JoinColumn({ name: 'planetId', referencedColumnName: 'id' })
  public planet: Planet;
}
