import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultCreate } from './dto/result-create.dto';
@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async create(createCampusDto: CreateCampusDto): Promise<ResultCreate> {
    try {
      const savedCampus = await this.prisma.campus.create({
        data: createCampusDto,
      });
      console.log(savedCampus);
      const result: ResultCreate = new ResultCreate(
        true,
        'Campus created successfully',
        savedCampus,
      );
      return Promise.resolve(result);
    } catch (error) {
      throw new Error('Failed to create campus');
    }
  }

  async findAll() {
    try {
      const currentPage = 1;
      const perPage = 2;

      const skip = (currentPage - 1) * perPage;
      const total = await this.prisma.campus.count();
      const result = await this.prisma.campus.findMany({
        skip,
        take: perPage,
      });

      const lastPage = Math.ceil(total / perPage);
      const prev = currentPage > 1 ? currentPage - 1 : null;
      const next = currentPage < lastPage ? currentPage + 1 : null;

      const response = {
        total,
        lastPage,
        currentPage,
        perPage,
        prev,
        next,
        result,
      };

      return response;
    } catch (error) {
      throw new Error('Failed to retrieve campuses');
    }
  }

  async findOne(id: string): Promise<ResultCreate> {
    try {
      const campus = await this.prisma.campus.findUnique({ where: { id } });
      const result: ResultCreate = new ResultCreate(
        true,
        'Campus retrieved successfully',
        campus,
      );
      return Promise.resolve(result);
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
      const result: ResultCreate = new ResultCreate(
        true,
        'Campus updated successfully',
        updatedCampus,
      );

      return Promise.resolve(result);
    } catch (error) {
      throw new Error('Failed to update campus');
    }
  }

  async remove(id: string) {
    try {
      const deletedCampus = await this.prisma.campus.delete({ where: { id } });
      return { messages: 'campus deleted successfully' };
    } catch (error) {
      throw new NotFoundException('Campus not found');
    }
  }
}
