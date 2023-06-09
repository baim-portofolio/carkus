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

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CampusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
