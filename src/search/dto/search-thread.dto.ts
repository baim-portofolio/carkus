import { PartialType } from '@nestjs/mapped-types';
import { CreateThreadDto } from '../../threads/dto/create-thread.dto';

export class SearchThreadDto extends PartialType(CreateThreadDto) {}
