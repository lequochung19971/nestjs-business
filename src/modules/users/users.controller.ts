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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryParamsDto } from './dto/users-query-params.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { Csrf } from 'src/decorators/csrf.decorator';
import { IsBypassCsrf } from 'src/decorators/is-bypass-csrf.decorator';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtGuard)
@Csrf()
@ApiTags('users')
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
  @ApiHeader({
    name: 'csrf-token',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @IsBypassCsrf()
  getUsers(@Query() params: UsersQueryParamsDto) {
    return this.usersService.getUsers(params);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
