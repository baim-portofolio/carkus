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
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { AllowAnonymous } from 'src/auth/guard/AllowAnonymous.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { SearchThreadDto } from '../search/dto/search-thread.dto';
@Controller()
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('id_campus') id_campus: string,
    @Body() createThreadDto: CreateThreadDto,
    @Request() req,
  ) {
    return this.threadsService.create(id_campus, createThreadDto, req.user);
  }

  @AllowAnonymous()
  @Get()
  findAll(@Param('id_campus') id_campus: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.threadsService.findAll(id_campus, page, perPage);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id_thread')
  update(@Param('id_thread') id_thread: string, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadsService.update(id_thread, updateThreadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id_thread')
  remove(@Param('id_thread') id_thread: string) {
    return this.threadsService.remove(id_thread);
  }
}
