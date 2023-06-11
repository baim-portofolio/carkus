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
import { CommentAuthMiddleware } from './middleware/CommentAuth.middleware';
import { PrismaService } from './prisma/prisma.service';
import { ThreadAuthMiddleware } from './middleware/ThreadAuth.middleware';
import { UserAuthMiddleware } from './middleware/UserAuth.middleware';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    CampusModule,
    ThreadsModule,
    CommentsModule,
    SearchModule,
  ],
  controllers: [],
  providers: [CommentAuthMiddleware, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CommentAuthMiddleware)
      .forRoutes(
        {
          path: '/campus/:id_campus/threads/:id_thread/comments/:id_comment',
          method: RequestMethod.PATCH,
        },
        {
          path: '/campus/:id_campus/threads/:id_thread/comments/:id_comment',
          method: RequestMethod.DELETE,
        },
      )
      .apply(ThreadAuthMiddleware)
      .forRoutes(
        {
          path: '/campus/:id_campus/threads/:id_thread',
          method: RequestMethod.PATCH,
        },
        {
          path: '/campus/:id_campus/threads/:id_thread',
          method: RequestMethod.DELETE,
        },
      )
      .apply(UserAuthMiddleware)
      .forRoutes(
        {
          path: '/users/:id_user',
          method: RequestMethod.PATCH,
        },
        {
          path: '/users/:id_user',
          method: RequestMethod.DELETE,
        },
      );
  }
}
