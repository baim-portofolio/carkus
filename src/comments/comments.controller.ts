import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AllowAnonymous } from 'src/auth/guard/AllowAnonymous.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id_thread') id_thread: string,
    @Request() req,
  ) {
    return this.commentsService.create(
      createCommentDto,
      id_thread,
      req.user,
    );
  }

  @AllowAnonymous()
  @Get()
  findAll(
    @Param('id_thread') id_thread: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10
  ) {
    return this.commentsService.findAll(id_thread, page, perPage);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id_comment')
  update(
    @Param('id_comment') id_comment: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(
      id_comment,
      updateCommentDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id_comment')
  remove(
    @Param('id_comment') id_comment: string,
  ) {
    return this.commentsService.remove(id_comment);
  }
}
