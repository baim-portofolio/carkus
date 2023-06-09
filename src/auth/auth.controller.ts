import { Controller, Request, Post, UseGuards, Get, Body, Response, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/createUsers.dto';
import { RolesGuard } from './role/roles.guard';
import { Roles } from './role/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    return this.userService.createUsers(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
