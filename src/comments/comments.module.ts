import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ThreadsModule } from 'src/threads/threads.module'; 
import { forwardRef } from '@nestjs/common';
@Module({
  // imports: [
  //   forwardRef(() => ThreadsModule), // Menggunakan forwardRef() untuk menunda evaluasi dependensi
  // ],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  JwtService,]
})
export class CommentsModule {}
