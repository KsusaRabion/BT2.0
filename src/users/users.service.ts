//user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['tasks'] });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id }, relations: ['tasks'] });
  }

  async create(userData: Partial<User>): Promise<User> {
     const user = this.userRepository.create(userData);
     return await this.userRepository.save(user);
   }


  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    Object.assign(user, userData);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
