import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SessionUser } from 'src/utils/decorators/session-user.decorator';
import { RequestUser } from 'src/utils/types/request-user.interface';

@Controller()
export class TasksController {
    constructor(private tasksService: TasksService) {}
 
    @Get('/tasks')
    getTasks(
        @SessionUser() user: RequestUser,
    ) {
        return this.tasksService.getTasks(user);
    }

    @Get('/task')
    getTask(
        @SessionUser() user: RequestUser,
        @Query('taskId') taskId: string,
    ) {
        return this.tasksService.getTask(taskId,user);
    }

    @Post('/tasks')
    createTask(
        @SessionUser() user: RequestUser,
        @Body() dto: CreateTaskDto,
    ) {
        return this.tasksService.createTask(user, dto);
    }
}
