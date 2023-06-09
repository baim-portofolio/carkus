import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: env.SECRET_KEY,
    signOptions: { expiresIn: '3600s' },
  })],
  providers: [LocalStrategy, AuthService, JwtStrategy, PrismaService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
