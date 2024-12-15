import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { UpdateUserEntity } from './entities/update_user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(@Query('role') role?: UserRole): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body(ValidationPipe) user: UpdateUserEntity,
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<User> {
    return this.usersService.delete(id)
  }
}
