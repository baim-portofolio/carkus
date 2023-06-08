import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/createUsers.dto';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}
}
