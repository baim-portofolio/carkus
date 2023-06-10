import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
  //   RouterModule.register([
  //     {
  //       path: 'threads',
  //       module: ThreadsModule,
  //       children: [
  //         {
  //           path: ':id_thread/comments',
  //           module: CommentsModule,
  //         },
  //       ]
  //     }
  // ]),
],
  controllers: [ThreadsController],
  providers: [ThreadsService, PrismaService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  JwtService,]
})
export class ThreadsModule {}
