import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SearchThreadDto } from '../search/dto/search-thread.dto';
import { PageDto } from 'src/common/result/page.dto';
import { PageMetaDto } from 'src/common/result/page-meta.dto';
import { PageOptionsDto } from 'src/common/result/page-options.dto';
import { Threads } from '@prisma/client';
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

      return {
        sucsses: true,
        message: 'Thread created',
        data: createThread,
      }
    } catch (error) {
      throw new HttpException(
        'Error while creating thread',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(id_campus: string, page: number, perPage: number) {
    try {
      let resultThreads = await this.prisma.threads.findMany({
        where: {
          id_campus: id_campus,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              role: true,
            },
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
      });

      const total = resultThreads.length;
      const lastPage = Math.ceil(total / perPage);
      const baseUrl = `/campus/${id_campus}/threads/`;
      const pageOptionsDto = new PageOptionsDto(page, perPage);
      const pageMetaDto = new PageMetaDto(total, pageOptionsDto, baseUrl);
      const pageDto = new PageDto<Threads>(pageMetaDto, resultThreads);
      return pageDto;

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

      return {
        sucsses: true,
        message: 'Thread updated',
        data: updateThread,
      };
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

      return {
        sucsses: true,
        message: 'Thread removed',
        data: removeThread,
      };
    } catch (error) {
      throw new HttpException(
        'Error while removing thread',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async search(query: SearchThreadDto) {
    const { title, thread } = query;

    try {
      const resultThreads = await this.prisma.threads.findMany({
        where: {
          OR: [
            {
              title: {
                contains: title,
              },
            },
            {
              thread: {
                contains: thread,
              },
            },
          ],
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
        'Error while searching threads',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
