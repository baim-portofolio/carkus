import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/createUsers.dto';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    async createUsers(@Body() data: CreateUserDto) {
        console.log(data);
        return this.usersService.createUsers(data);
    }
}
