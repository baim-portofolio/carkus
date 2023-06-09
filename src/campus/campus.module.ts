import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CampusController],
  providers: [CampusService, PrismaService]
})
export class CampusModule {}
