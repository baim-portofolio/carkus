import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultCreate } from './dto/result-create.dto';
import { PageDto } from 'src/common/result/page.dto';
import { Campus } from '@prisma/client';
import { PageMetaDto } from 'src/common/result/page-meta.dto';
import { PageOptionsDto } from 'src/common/result/page-options.dto';
@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async create(createCampusDto: CreateCampusDto) {
    try {
      const savedCampus = await this.prisma.campus.create({
        data: createCampusDto,
      });

      return {
        sucsses: true,
        messages: 'Campus created successfully',
        data: savedCampus,
      };
    } catch (error) {
      throw new Error('Failed to create campus');
    }
  }

  async findAll(page: number, perPage: number): Promise<PageDto<Campus>> {
    try {
      const skip = (page - 1) * perPage;
      const total = await this.prisma.campus.count();
      const result = await this.prisma.campus.findMany({
        skip,
        take: perPage,
      });

      const lastPage = Math.ceil(total / perPage);
      const baseUrl = '/campus/';
      const pageOptionsDto = new PageOptionsDto(page, perPage);
      const pageMetaDto = new PageMetaDto(total, pageOptionsDto, baseUrl);
      const pageDto = new PageDto<Campus>(pageMetaDto, result);

      return pageDto;
    } catch (error) {
      throw new Error('Failed to retrieve campuses');
    }
  }

  async findOne(id: string): Promise<ResultCreate> {
    try {
      const campus = await this.prisma.campus.findUnique({
        where: { id },
        include: { threads: true },
      });

      if (campus.threads.length === 0) {
        campus.threads = null;
      }

      return {
        success: true,
        message: 'Campus updated successfully',
        data: campus,
      };
    } catch (error) {
      throw new Error('Failed to retrieve campus');
    }
  }

  async update(
    id: string,
    updateCampusDto: UpdateCampusDto,
  ): Promise<ResultCreate> {
    try {
      const updatedCampus = await this.prisma.campus.update({
        where: { id },
        data: updateCampusDto,
      });
      return {
        success: true,
        message: 'Campus updated successfully',
        data: updatedCampus,
      };
    } catch (error) {
      throw new Error('Failed to update campus');
    }
  }

  async remove(id: string) {
    try {
      const deletedCampus = await this.prisma.campus.delete({ where: { id } });
      return {
        sucsses: true,
        messages: 'campus deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException('Campus not found');
    }
  }
}
