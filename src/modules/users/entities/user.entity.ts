import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshToken?: string;

  // @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  // /**
  //  * m - male
  //  * f - female
  //  * u - unspecified
  //  */
  // gender: string;
}
