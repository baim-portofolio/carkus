import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { AllowAnonymous } from 'src/auth/guard/AllowAnonymous.decorator';

@Controller('campus')
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campusService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCampusDto: UpdateCampusDto) {
    return this.campusService.update(id, updateCampusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campusService.remove(+id);
  }
}
