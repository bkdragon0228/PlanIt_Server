import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { IsNotEmptyString } from 'src/decorators/is-not-empty-string.decorator';
import { Work } from './work.entity';

@Entity()
export class Planet extends TimeColumns {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @IsNotEmptyString(1, 15)
  public name: string;

  @Column()
  @IsNotEmptyString(1, 50)
  public description: string;

  @OneToMany(() => Work, (work) => work.planet, { cascade: ['remove'] })
  works: Work[];
}
