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

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchCampus(query: SearchCampusDto) {
    try {
      const { campus_name, address } = query;
      const searchCampus = await this.prisma.campus.findMany({
        where: {
          campus_name: {
            contains: campus_name ? campus_name : undefined,
            mode: 'insensitive',
          },
          address: {
            contains: address ? address : undefined,
            mode: 'insensitive',
          },
        },
      });

      if (!searchCampus) {
        throw new NotFoundException('Campus not found');
      }

      return searchCampus;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to search campus',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchUsers(query: SearchUserDto) {
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
      });

      if (users.length === 0) {
        throw new NotFoundException('Users not found');
      }

      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to search users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchThreads(query: SearchThreadDto) {
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
      });

      if (!searchThreads) {
        throw new NotFoundException('Threads not found');
      }

      return searchThreads;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to search threads',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
