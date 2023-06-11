import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { CampusModule } from './campus/campus.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RolesGuard } from './auth/role/roles.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/CommentAuth.middleware';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CampusModule, ThreadsModule, CommentsModule],
  controllers: [],
  providers: [LoggerMiddleware, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/campus/:id_campus/threads/:id_thread/comments/:id_comment', method: RequestMethod.PATCH });
  }
}
