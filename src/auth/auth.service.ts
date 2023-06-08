import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResultLogin } from './dto/result-login.dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { username } });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password: _password, ...result } = user;
        return result;
      }
    }
    return null;
  } 

  async login(user: any): Promise<ResultLogin> {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      success: true,
      message: 'Login success',
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
  
}
