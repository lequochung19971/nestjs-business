import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryParamsDto } from './dto/users-query-params.dto';
import { UserNotFound } from './exceptions/user-not-found';
import { UserDto } from './dto/user.dto';
import { toQueryResponseDto } from 'src/utils/toDtoArray';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { SALT_ROUND } from 'src/constants/salt-round.constant';
@Injectable()
export class UsersService {
  private SALT_ROUND = 11;

  constructor(private readonly userRepository: UsersRepository) {}
  async createUser(createUserDto: CreateUserDto) {
    const existedUser = await this.userRepository.findOne({
      where: [
        {
          username: createUserDto.username,
        },
        {
          email: createUserDto.email,
        },
      ],
    });

    if (existedUser) {
      throw new ConflictException(`This user is existed`);
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUND,
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    this.userRepository.save(user);
  }

  async getUsers(params: UsersQueryParamsDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    let totalCount: number;
    if (params.includeTotalCount) {
      totalCount = await queryBuilder.getCount();
    }

    const users = await queryBuilder
      .orderBy(params.orderColumn, params.order)
      .take(params.take)
      .skip(params.skip)
      .getMany();
    return toQueryResponseDto(UserDto, {
      entity: users,
      meta: {
        page: params.page,
        take: params.take,
        totalCount,
      },
    });
  }

  async getUser(id: string) {
    const userEntity = await this.userRepository.findOneBy({
      id,
    });

    if (!userEntity) {
      throw new UserNotFound();
    }

    return userEntity.toDto(UserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      throw new UserNotFound();
    }

    this.userRepository.merge(userEntity, updateUserDto);

    await this.userRepository.save(userEntity);
  }

  deleteUser(id: string) {
    return `This action removes a #${id} user`;
  }
}
