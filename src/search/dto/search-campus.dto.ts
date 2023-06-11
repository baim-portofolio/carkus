import { PartialType } from '@nestjs/mapped-types';
import { CreateCampusDto } from '../../campus/dto/create-campus.dto';

export class SearchCampusDto extends PartialType(CreateCampusDto) {}
