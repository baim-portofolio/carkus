import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUsers.dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUsers(data: CreateUserDto): Promise<{ success: boolean, message: string, data: Omit<Users, 'password'> }> {
    const existingUser = await this.prisma.users.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      throw new ConflictException(`Username or Email already used`);
    }

    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;

    const savedUser = await this.prisma.users.create({
      data,
    });

    const { password: _, ...userDataWithoutPassword } = savedUser;

    return {
      success: true,
      message: 'User created successfully',
      data: userDataWithoutPassword,
    };
  }
}
