import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { IsNotEmptyString } from 'src/decorators/is-not-empty-string.decorator';

@Entity()
export class Planet extends TimeColumns {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @IsNotEmptyString(1, 15)
  public name: string;

  @Column()
  @IsNotEmptyString(1, 50)
  public desciption: string;
}
