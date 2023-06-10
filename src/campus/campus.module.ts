import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/role/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RouterModule } from '@nestjs/core';
import { ThreadsModule } from 'src/threads/threads.module';
import { CommentsModule } from 'src/comments/comments.module';
@Module({
  imports: [
    RouterModule.register([
      {
        path: 'campus',
        module: CampusModule,
        children: [
          {
            path: ':id_campus/threads',
            module: ThreadsModule,
            children: [
              {
                path: ':id_thread/comments',
                module: CommentsModule,
              }
            ]
          },
        ],
      },
    ])
  ],
  controllers: [CampusController],
  providers: [
    CampusService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
  ],
})
export class CampusModule {}
