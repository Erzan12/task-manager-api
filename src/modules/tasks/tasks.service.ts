import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE } from 'src/database/database.provider';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { eq } from 'drizzle-orm';
import { tasks, users } from 'src/database/schema';

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
}
