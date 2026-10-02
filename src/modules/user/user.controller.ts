import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { SessionUser } from 'src/utils/decorators/session-user.decorator';

@Controller()
export class UserController {
    constructor(private userService: UsersService) {}

    @Get('/users')
    getAllUser(@SessionUser() user: RequestUser) {
        return this.userService.findAll(user);
    }

    @Get('/user')
    getUserByEmail(
        @Query('email') email: string
    ) {
        return this.userService.findByEmail(email);
    }

    @Post('/user')
    createUser(
        @Body() dto: CreateUserDto
    ) {
        return this.userService.create(dto);
    }
}
