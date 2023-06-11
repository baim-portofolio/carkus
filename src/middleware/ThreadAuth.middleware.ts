import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';

@Injectable()
export class ThreadAuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const context = new ExecutionContextHost([req]);
      const request = context.switchToHttp().getRequest();
      const { id_thread } = request.params;

      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid token');
      }
      const token = authHeader.split(' ')[1];

      let decodedToken;
      try {
        decodedToken = jwt.verify(token, env.SECRET_KEY);
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }

      const findThread = await this.prisma.threads.findUnique({
        where: {
          id: id_thread,
        },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });

      if (findThread.user.id !== decodedToken.id || decodedToken.role !== 'admin') {
        throw new UnauthorizedException('You are not authorized');
      }

      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
