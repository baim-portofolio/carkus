import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, id_thread: string, req) {
    try {
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
    } catch (error) {
      throw new HttpException(
        'Error while creating comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(id_thread: string) {
    try {
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
    } catch (error) {
      throw new HttpException(
        'Error while finding comments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id_comment: string, updateCommentDto: UpdateCommentDto) {
    try {
      const updateComment = await this.prisma.comments.update({
        where: {
          id: id_comment,
        },
        data: updateCommentDto,
      });

      return updateComment;
    } catch (error) {
      throw new HttpException(
        'Error while updating comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id_comment: string) {
    try {
      const deleteComment = await this.prisma.comments.delete({
        where: {
          id: id_comment,
        },
      });

      return deleteComment;
    } catch (error) {
      throw new HttpException(
        'Error while deleting comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
