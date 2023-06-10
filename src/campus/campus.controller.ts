import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampusService } from './campus.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { AllowAnonymous } from 'src/auth/guard/AllowAnonymous.decorator';

@Controller()
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('create')
  create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusService.create(createCampusDto);
  }

  @AllowAnonymous()
  @Get()
  findAll() {
    return this.campusService.findAll();
  }

  @AllowAnonymous()
  @Get(':id_campus')
  findOne(@Param('id_campus') id_campus: string) {
    return this.campusService.findOne(id_campus);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('update/:id_campus')
  update(@Param('id_campus') id_campus: string, @Body() updateCampusDto: UpdateCampusDto) {
    return this.campusService.update(id_campus, updateCampusDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id_campus') id_campus: string) {
    return this.campusService.remove(id_campus);
  }
}
