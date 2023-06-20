import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SearchCampusDto } from './dto/search-campus.dto';
import { SearchUserDto } from 'src/users/dto/search-user.dto';
import { SearchThreadDto } from './dto/search-thread.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PageDto } from 'src/common/result/page.dto';
import { PageMetaDto } from 'src/common/result/page-meta.dto';
import { PageOptionsDto } from 'src/common/result/page-options.dto';
import { Campus, Users } from '@prisma/client';
import { promises } from 'dns';
@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchCampus(query: SearchCampusDto, page: number, perPage: number): Promise<PageDto<Campus>> {
    try {
      const { campus_name, address } = query;
      const searchCampus = await this.prisma.campus.findMany({
        where: {
          campus_name: {
            contains: campus_name || undefined,
            mode: 'insensitive',
          },
          address: {
            contains: address || undefined,
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
      });
  
      const total = searchCampus.length;
      const lastPage = Math.ceil(total / perPage);
      const baseUrl = 'search/campus/';
      const pageOptionsDto = new PageOptionsDto(page, perPage);
      const pageMetaDto = new PageMetaDto(total, pageOptionsDto, baseUrl);
      const pageDto = new PageDto(pageMetaDto, searchCampus);
  
      if (pageDto.data.length === 0) {
        throw new NotFoundException('Campus not found');
      }
      return pageDto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new Error('Failed to retrieve campuses');
      }
    }
  }

  async searchUsers(query: SearchUserDto, page: number, perPage: number) {
    try {
      const { id, email, username } = query;

      const users = await this.prisma.users.findMany({
        where: {
          id: id ? id : undefined,
          email: email ? email : undefined,
          username: {
            contains: username ? username : undefined,
          },
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
        skip: (page - 1) * perPage,
        take: perPage,
      });

      const total = users.length;
      const lastPage = Math.ceil(total / perPage);
      const baseUrl = 'search/users/';
      const pageOptionsDto = new PageOptionsDto(page, perPage);
      const pageMetaDto = new PageMetaDto(total, pageOptionsDto, baseUrl);
      const pageDto = new PageDto(pageMetaDto, users);


      if (users.length === 0) {
        throw new NotFoundException('Users not found');
      }

      return pageDto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new Error('Failed to retrieve user');
      }
    }
  }

  async searchThreads(query: SearchThreadDto, page: number, perPage: number) {
    try {
      const { title, thread } = query;
      const searchThreads = await this.prisma.threads.findMany({
        where: {
          title: {
            contains: title ? title : undefined,
            mode: 'insensitive',
          },
          thread: {
            contains: thread ? thread : undefined,
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
      });

      const total = searchThreads.length;
      const lastPage = Math.ceil(total / perPage);
      const baseUrl = 'search/threads/';
      const pageOptionsDto = new PageOptionsDto(page, perPage);
      const pageMetaDto = new PageMetaDto(total, pageOptionsDto, baseUrl);
      const pageDto = new PageDto(pageMetaDto, searchThreads);

      if (!searchThreads) {
        throw new NotFoundException('Threads not found');
      }

      return pageDto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new Error('Failed to retrieve thread');
      }
    }
  }
}
