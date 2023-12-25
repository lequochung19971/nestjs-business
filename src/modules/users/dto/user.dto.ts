import { BaseDto } from 'src/dtos/base.dto';
import { User } from '../entities/user.entity';

export class UserDto extends BaseDto {
  name: string;

  username: string;

  email: string;

  constructor(user: User) {
    super();
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
