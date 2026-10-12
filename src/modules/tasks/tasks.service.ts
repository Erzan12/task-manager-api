import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database, DATABASE } from 'src/database/database.provider';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { eq } from 'drizzle-orm';
import { tasks, users } from 'src/database/schema';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @Inject(DATABASE)
        private readonly db: Database,
    ) {}

    private async assertAccess(userId: string) {
        const existingUser = await this.db.query.users.findFirst({
            where: eq(users.id, userId)
        });
    
        if (!existingUser || existingUser.is_active === false) {
            throw new BadRequestException('Session user is not allowed to perform this action, might not exists or inactive.');
        }

        return existingUser;
    }

    async getTask(taskId: string, user: RequestUser) {
        await this.assertAccess(user.id);

        const task = await this.db.query.tasks.findFirst({
            where: eq(tasks.id, taskId),
            with: {
                author: true,
                category: true,
            },
        });

        if (!task) {
            throw new BadRequestException('Task does not exists.');
        }

        return {
            status: 'success',
            message: 'Here is the task',
            task,
        };
    }

    async getTasks(user: RequestUser) {
        await this.assertAccess(user.id);

        const taskList = await this.db.query.tasks.findMany({
            where: eq(tasks.userId, user.id),
            with: {
                author: true,
                category: true,
            },
        });


        if (taskList.length === 0) {
            throw new BadRequestException('No tasks added.')
        }

        return {
            status: 'success',
            message: 'Your active tasks.',
            taskList,
        };
    }

    async createTask(user: RequestUser, dto: CreateTaskDto) {
        await this.assertAccess(user.id);

        const [task] = await this.db
            .insert(tasks)
            .values({
                title: dto.title,
                description: dto.description,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                userId: user.id,
            })
            .returning();

        return {
            status: 'success',
            message: 'Task created successfully',
            task,
        };
    }

    async updateTask(user: RequestUser, dto: UpdateTaskDto, taskId: string) {
        await this.assertAccess(user.id);

        const existingTask = await this.db.query.tasks.findFirst({
            where: eq(tasks.id, taskId),
        })

        if (!existingTask) {
            throw new NotFoundException('Task does not exists.');
        }

        const [task] = await this.db
            .update(tasks)
            .set({
                title: dto.title ?? existingTask.title,
                description: dto.description ?? existingTask.description,
                priority: dto.priority ?? existingTask.priority,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : existingTask.dueDate,
                userId: user.id,
            })
            .returning();

        return {
            status: 'success',
            message: 'Task updated successfully',
            task,
        };
    }
}
