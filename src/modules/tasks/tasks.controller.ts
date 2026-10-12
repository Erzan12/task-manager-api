import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SessionUser } from 'src/utils/decorators/session-user.decorator';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

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
        @Param('taskId', ParseUUIDPipe) taskId: string,
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

    @Put('/:taskId')
    updateTask(
        @SessionUser() user: RequestUser,
        @Body() dto: UpdateTaskDto,
        @Param('taskId', ParseUUIDPipe) taskId: string,
    ) {
        return this.tasksService.updateTask(user, dto, taskId);
    }
}
