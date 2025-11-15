//user.entity
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Role } from '../../roles/entities/role.entity';
import { ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Task, task => task.user, { eager: true })
  tasks: Task[];

  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable()
  roles: Role[];
}