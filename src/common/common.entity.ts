import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  @Exclude()
  public createdAt?: Date;

  @UpdateDateColumn()
  @Exclude()
  public updatedAt?: Date;
}