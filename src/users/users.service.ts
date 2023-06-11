import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-thread.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUsers(data: CreateUserDto): Promise<{
    success: boolean;
    message: string;
    data: Omit<Users, 'password'>;
  }> {
    try {
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
    } catch (error) {
      throw new HttpException(
        'Error while creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUsers(
    data: UpdateUserDto,
    id_user: string,
  ): Promise<{
    success: boolean;
    message: string;
    data: Omit<Users, 'password'>;
  }> {
    try {
      const updateUser = await this.prisma.users.update({
        where: {
          id: id_user,
        },
        data,
      });

      const { password: _, ...userDataWithoutPassword } = updateUser;

      return {
        success: true,
        message: 'User updated successfully',
        data: userDataWithoutPassword,
      };
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async deleteUsers(id_user: string) {
    try {
      const deleteUser = await this.prisma.users.delete({
        where: {
          id: id_user,
        },
      });

      return {
        success: true,
        message: 'User deleted successfully',
        data: deleteUser,
      };
    } catch (error) {
      throw new HttpException(
        'Error while deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
