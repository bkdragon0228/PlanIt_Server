import { IsNotEmptyString } from 'src/decorators/is-not-empty-string.decorator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { IsStrongPasswordCustom } from 'src/decorators/is-strong-password.decorator';

@Entity()
export class User extends TimeColumns {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmptyString(1, 50)
  @Column('varchar', { nullable: false })
  public email: string;

  @IsStrongPasswordCustom(10, {
    message: 'please enter valid password',
  })
  @Column({ select: false })
  public password: string;

  @IsNotEmptyString(1, 50)
  @Column()
  public username: string;

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