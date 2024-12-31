import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUser } from './entities/update_user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAll(role?: UserRole): Promise<User[]> {
    if (role) {
      const userMatchRoles = await this.usersRepository.findBy({ role: role });
      if (!userMatchRoles.length) {
        throw new NotFoundException('User Role Not Found')
      }
      return userMatchRoles;
    }
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const exists = await this.usersRepository.findOneBy({ id });
    if (!exists) throw new NotFoundException('User Not Found');
    return exists;
  }

  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.insert(newUser);
    return newUser;
  }

  async update(id: number, user: UpdateUser): Promise<User> {
    const exists = await this.findOne(id);
    if (exists) {
      await this.usersRepository.update({ id }, user);
      return { ...exists, ...user };
    }

  }

  async delete(id: number): Promise<User> {
    const user = this.findOne(id);
    this.usersRepository.delete(id);
    return user;
  }
}
