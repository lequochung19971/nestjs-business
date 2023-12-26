import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/entities/base.entity';
import { RefreshToken } from 'src/modules/auth/entities/refresh-token.entity';
import { Entity, Column, OneToMany, JoinTable } from 'typeorm';

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

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens?: RefreshToken[];

  // @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  // /**
  //  * m - male
  //  * f - female
  //  * u - unspecified
  //  */
  // gender: string;
}
