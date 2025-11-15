// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Доступ только для администратора
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrator')
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  // Доступ только для авторизованных пользователей
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task | null> {
    return await this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() taskData: Partial<Task>): Promise<Task> {
    return await this.tasksService.create(taskData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return await this.tasksService.update(id, taskData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.tasksService.remove(id);
  }

  // Новые эндпоинты для задач пользователя
  @UseGuards(JwtAuthGuard)
  @Post('user/:userId')
  async createTaskForUser(
    @Param('userId') userId: number,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return await this.tasksService.createTaskForUser(userId, taskData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findTasksByUserId(@Param('userId') userId: number): Promise<Task[]> {
    return await this.tasksService.findTasksByUserId(userId);
  }
}
