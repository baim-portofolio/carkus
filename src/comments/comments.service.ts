import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    id_campus: string,
    id_thread: string,
    req,
  ) {
    const createComment = await this.prisma.comments.create({
      data: {
        ...createCommentDto,
        user: {
          connect: {
            id: req.id_user,
          },
        },
        thread: {
          connect: {
            id: id_thread,
          },
        },
      },
    });

    return createComment;
  }

  async findAll(id_campus: string, id_thread: string) {
    const resultComments = await this.prisma.comments.findMany({
      where: {
        id_thread: id_thread,
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

    return resultComments;
  }

  async update(id_campus: string, id_thread: string, id_comment: string, updateCommentDto: UpdateCommentDto) {
    console.log(id_comment);
    const updateComment = await this.prisma.comments.update({
      where: {
        id: id_comment,
      },
      data: updateCommentDto,
    });

    return updateComment;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
