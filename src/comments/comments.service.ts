import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PageDto } from '../common/result/page.dto';
import { PageMetaDto } from '../common/result/page-meta.dto';
import { PageOptionsDto } from '../common/result/page-options.dto';

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

      return {
        sucsses: true,
        message: 'Comment created',
        data: createComment,
      };
    } catch (error) {
      throw new HttpException(
        'Error while creating comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(id_thread: string, page: number, perPage: number) {
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
        skip: (page - 1) * perPage,
        take: perPage,
      });

      const total = resultComments.length;
      const lastPage = Math.ceil(total / perPage);
      const baseUrl = `campus/${id_thread}/comments/`;
      const pageOptionsDto = new PageOptionsDto(page, perPage);
      const pageMetaDto = new PageMetaDto(total, pageOptionsDto, baseUrl);
      const pageDto = new PageDto(pageMetaDto, resultComments);


      return pageDto;
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

      return {
        sucsses: true,
        message: 'Comment updated',
        data: updateComment,
      };
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

      return {
        sucsses: true,
        message: 'Comment deleted',
        data: deleteComment,
      };
    } catch (error) {
      throw new HttpException(
        'Error while deleting comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
