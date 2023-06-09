import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
