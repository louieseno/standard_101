import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      role: "EMPLOYEE",
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "EMPLOYEE",
    },
    {
      id: 4,
      name: "Diana Ross",
      email: "diana.ross@example.com",
      role: "EMPLOYEE",
    },
    {
      id: 5,
      name: "Ethan Brown",
      email: "ethan.brown@example.com",
      role: "EMPLOYEE",
    },
  ];

  findAll(role?: 'ADMIN' | 'EMPLOYEE'): Array<object> {
    if (role) {
      const userMatchRoles = this.users.filter((user) => user.role === role);
      if (!userMatchRoles.length) {
        throw new NotFoundException('User Role Not Found')
      }
      return userMatchRoles;
    }

    return this.users;
  }

  findOne(id: number): object {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found')
    return user;
  }

  create(createUserDto: CreateUserDTO): number {
    let userBaseId: number = 0;

    if (this.users.length > 0) {
      userBaseId = [...this.users].sort((a, b) => b.id - a.id)[0].id;
    }

    return this.users.push({ ...createUserDto, id: ++userBaseId });
  }

  update(id: number, updateUserDto: UpdateUserDTO): object {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto }
      }
      return user;
    })

    return this.findOne(id);
  }

  delete(id: number): object {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
