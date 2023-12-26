import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RefreshToken extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  hashedToken: string;

  @Column({
    type: 'bigint',
  })
  expiresIn: number;

  @Column({
    type: 'varchar',
  })
  requestId: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}
