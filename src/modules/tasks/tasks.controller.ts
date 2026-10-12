import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SessionUser } from 'src/utils/decorators/session-user.decorator';
import { RequestUser } from 'src/utils/types/request-user.interface';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
 
    @Get('/my-tasks')
    getTasks(
        @SessionUser() user: RequestUser,
    ) {
        return this.tasksService.getTasks(user);
    }

    @Get('/:taskId')
    getTask(
        @SessionUser() user: RequestUser,
        @Query('taskId') taskId: string,
    ) {
        return this.tasksService.getTask(taskId,user);
    }

    @Post()
    createTask(
        @SessionUser() user: RequestUser,
        @Body() dto: CreateTaskDto,
    ) {
        return this.tasksService.createTask(user, dto);
    }
}
