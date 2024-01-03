import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Csrf } from 'src/decorators/csrf.decorator';
import { IsBypassCsrf } from 'src/decorators/is-bypass-csrf.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryParamsDto } from './dto/user-query-params.dto';
import { JwtGuard } from '../../guards/jwt.guard';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtGuard)
@Csrf()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  /**
   * @desc
   * Describe API with `ApiOperation`
   * @caveat
   * - Almost developers will ignore to describe because they think that
   * they can understand API when looking API and body, but there will be a problem
   * for a big project.
   */
  @ApiOperation({
    summary: 'Create new user',
  })
  @HttpCode(HttpStatus.OK)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Query Users',
  })
  @Get()
  @IsBypassCsrf()
  @HttpCode(HttpStatus.OK)
  getUsers(@Query() params: UserQueryParamsDto) {
    return this.usersService.getUsers(params);
  }

  @ApiOperation({
    summary: 'Get a user by id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({
    summary: 'Update user partially',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Soft delete user by id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
