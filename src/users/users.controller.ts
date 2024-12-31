import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { UpdateUser } from './entities/update_user.entity';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiQuery({ name: 'role', enum: UserRole, required: false })
  @ApiOperation({
    summary: "Fetch list of users"
  })
  findAll(@Query('role') role?: UserRole): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  @ApiOperation({ summary: "Find user by ID" })
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a user" })
  create(@Body(ValidationPipe) user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a user property/properties" })
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body(ValidationPipe) user: UpdateUser,
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Hard delete a user" })
  delete(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<User> {
    return this.usersService.delete(id)
  }
}
