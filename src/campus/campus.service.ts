import { Injectable } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultCreate } from './dto/result-create.dto';
@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async create(createCampusDto: CreateCampusDto): Promise<ResultCreate> {
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
  }

  findAll() {
    return `This action returns all campus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campus`;
  }

  async update(id: string, updateCampusDto: UpdateCampusDto) {
    const updatedCampus = await this.prisma.campus.update({
      where: { id: updateCampusDto.id },
      data: updateCampusDto,
    });
    const result: ResultCreate = new ResultCreate(
      true,
      'Campus updated successfully',
      updatedCampus,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} campus`;
  }
}
