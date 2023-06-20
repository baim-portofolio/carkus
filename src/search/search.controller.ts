import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchCampusDto } from './dto/search-campus.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { SearchThreadDto } from './dto/search-thread.dto';
import { AllowAnonymous } from 'src/auth/guard/AllowAnonymous.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @AllowAnonymous()
  @Get('campus')
  searchCampus(@Query() query: SearchCampusDto, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.searchService.searchCampus(query, page, perPage);
  }

  @AllowAnonymous()
  @Get('users')
  searchUsers(@Query() query: SearchUserDto, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.searchService.searchUsers(query, page, perPage);
  }

  @AllowAnonymous()
  @Get('threads')
  searchThreads(@Query() query: SearchThreadDto, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.searchService.searchThreads(query, page, perPage);
  }
}
