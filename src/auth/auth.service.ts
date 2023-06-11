import { Injectable, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResultLogin } from './dto/result-login.dto';
import { Request } from 'express';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.prisma.users.findUnique({ where: { username } });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          const { password: _password, ...result } = user;
          return result;
        }
      }
      return null;
    } catch (error) {
      throw new Error('Failed to validate user');
    }
  }

  async login(user: any): Promise<ResultLogin> {
    try {
      const payload = { id: user.id, username: user.username, role: user.role };
      return {
        success: true,
        message: 'Login success',
        access_token: this.jwtService.sign(payload),
        user: payload,
      };
    } catch (error) {
      throw new Error('Failed to login');
    }
  }

}
