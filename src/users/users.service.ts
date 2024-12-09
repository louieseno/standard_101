import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number): object {
    return this.users.find((user) => user.id === id);
  }

  create(user: { name: string; email: string; role: string; }): number {
    let userBaseId: number = 0;

    if (this.users.length > 0) {
      userBaseId = [...this.users].sort((a, b) => b.id - a.id)[0].id;
    }
    console.log(userBaseId);

    return this.users.push({ ...user, id: ++userBaseId });
  }

  update(id: number, updatedUser: { name?: string; email?: string; role?: string; }): object {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser }
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
