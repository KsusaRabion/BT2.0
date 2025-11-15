import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    Object.assign(task, taskData);
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  // Новые методы:
  async createTaskForUser(userId: number, taskData: Partial<Task>): Promise<Task> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    const task = this.taskRepository.create({ ...taskData, user });
    return await this.taskRepository.save(task);
  }

  async findTasksByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }
}