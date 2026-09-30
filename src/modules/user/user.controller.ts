import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller()
export class UserController {
    constructor(private userService: UsersService) {}

    @Get('/users')
    getAllUser() {
        return this.userService.findAll();
    }

    @Get('/user')
    getUserByEmail(
        @Query('email') email: string
    ) {
        return this.userService.findByEmail(email);
    }

    @Post()
    createUser(
        @Body() dto: CreateUserDto
    ) {
        return this.userService.create(dto);
    }
}
