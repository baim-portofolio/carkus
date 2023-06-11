import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class ThreadsService {
  constructor(private prisma: PrismaService) {}

  async create(id_campus: string, createThreadDto: CreateThreadDto, req) {
    try {
      const createThread = await this.prisma.threads.create({
        data: {
          ...createThreadDto,
          campus: {
            connect: {
              id: id_campus,
            },
          },
          user: {
            connect: {
              id: req.id_user,
            },
          },
        },
      });

      return createThread;
    } catch (error) {
      throw new HttpException(
        'Error while creating thread',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(id_campus: string) {
    try {
      const resultThreads = await this.prisma.threads.findMany({
        where: {
          id_campus: id_campus,
        },
        include: {
          user: {
            select: {
              username: true,
              role: true,
            },
          },
        },
      });

      return resultThreads;
    } catch (error) {
      throw new HttpException(
        'Error while finding threads',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id_thread: string, updateThreadDto: UpdateThreadDto) {
    try {
      const updateThread = await this.prisma.threads.update({
        where: {
          id: id_thread,
        },
        data: {
          ...updateThreadDto,
        },
      });

      return updateThread;
    } catch (error) {
      throw new HttpException(
        'Error while updating thread',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id_thread: string) {
    try {
      const removeThread = await this.prisma.threads.delete({
        where: {
          id: id_thread,
        },
      });
  
      return removeThread;
    } catch (error) {
      throw new HttpException('Error while removing thread', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
