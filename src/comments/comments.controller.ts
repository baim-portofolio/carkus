import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
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
    @Param('id_campus') id_campus: string,
    @Param('id_thread') id_thread: string,
    @Request() req,
  ) {
    return this.commentsService.create(
      createCommentDto,
      id_campus,
      id_thread,
      req.user,
    );
  }

  @AllowAnonymous()
  @Get()
  findAll(
    @Param('id_campus') id_campus: string,
    @Param('id_thread') id_thread: string,
  ) {
    return this.commentsService.findAll(id_campus, id_thread);
  }

  @Patch(':id_comment')
  update(
    @Param('id_campus') id_campus: string,
    @Param('id_thread') id_thread: string,
    @Param('id_comment') id_comment: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(
      id_campus,
      id_thread,
      id_comment,
      updateCommentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
