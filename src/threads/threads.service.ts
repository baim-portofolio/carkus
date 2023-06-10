import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ThreadsService {
  constructor(private prisma: PrismaService) {}

  async create(id_kampus: string, createThreadDto: CreateThreadDto, req) {
    const createThread = await this.prisma.threads.create({
      data: {
        ...createThreadDto,

        campus: {
          connect: {
            id: id_kampus,
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
  }

  async findAll(id_campus: string) {
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
  }

  async update(id_thread:string, updateThreadDto: UpdateThreadDto) {
    const updateThread = await this.prisma.threads.update({
      where: {
        id: id_thread,
      },
      data: {
        ...updateThreadDto,
      },
    });

    return updateThread;
        
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
