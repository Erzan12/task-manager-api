import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { SessionUser } from 'src/utils/decorators/session-user.decorator';

@Controller('/users')
export class UserController {
    constructor(private userService: UsersService) {}

    @Get()
    getAllUser(@SessionUser() user: RequestUser) {
        return this.userService.findAll(user);
    }

    @Get('/:userId')
    getUserById(
        @Query('userId') userId: string,
        @SessionUser() user: RequestUser
    ) {
        return this.userService.findById(userId, user);
    }

    @Post()
    createUser(
        @Body() dto: CreateUserDto,
        @SessionUser() user: RequestUser,
    ) {
        return this.userService.create(dto, user);
    }
}
