import { IsNotEmptyString } from 'src/decorators/is-not-empty-string.decorator';
import {
  Unique,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { TimeColumns } from '../common/time-columns';
import { IsStrongPasswordCustom } from 'src/decorators/is-strong-password.decorator';
import { UserPlanet } from './user-planet.entity';

@Entity()
@Unique(['email'])
export class User extends TimeColumns {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmptyString(1, 50)
  @Expose()
  @Column('varchar', { nullable: false })
  public email: string;

  @IsStrongPasswordCustom(8, {
    message: 'please enter valid password',
  })
  @Column()
  @Expose()
  public password: string;

  @IsNotEmptyString(1, 50)
  @Expose()
  @Column()
  public username: string;

  @Expose()
  @OneToMany(() => UserPlanet, (userPlanet) => userPlanet.user)
  userPlants: UserPlanet[];

  @AfterInsert()
  logInsert() {
    console.log(`create userId ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`update userId ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`remove userId ${this.id}`);
  }
}
