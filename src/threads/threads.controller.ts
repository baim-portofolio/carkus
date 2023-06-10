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
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { AllowAnonymous } from 'src/auth/guard/AllowAnonymous.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
  findAll(@Param('id_campus') id_campus: string) {
    return this.threadsService.findAll(id_campus);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id_thread')
  update(@Param('id_thread') id_thread: string, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadsService.update(id_thread, updateThreadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadsService.remove(+id);
  }
}
