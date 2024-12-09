import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'EMPLOYEE'): Array<object> {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string): object {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() user: { name: string; email: string; role: string; }): number {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: { name?: string; email?: string; role?: string; }): object {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.usersService.delete(+id)
  }
}
