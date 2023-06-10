import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/createUsers.dto';
import { RolesGuard } from './role/roles.guard';
import { Roles } from './role/roles.decorator';
import { AllowAnonymous } from './guard/AllowAnonymous.decorator';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @AllowAnonymous()
  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    return this.userService.createUsers(payload);
  }

  @UseGuards(LocalAuthGuard)
  @AllowAnonymous()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
