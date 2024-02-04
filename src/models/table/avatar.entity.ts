import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { IsOptional } from 'class-validator';

@Entity()
export class Avatar extends TimeColumns {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsOptional()
  @Column({ nullable: true })
  public imageUrl: string;
}
