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
  searchCampus(@Query() query: SearchCampusDto) {
    return this.searchService.searchCampus(query);
  }

  @AllowAnonymous()
  @Get('users')
  searchUsers(@Query() query: SearchUserDto) {
    return this.searchService.searchUsers(query);
  }

  @AllowAnonymous()
  @Get('threads')
  searchThreads(@Query() query: SearchThreadDto) {
    return this.searchService.searchThreads(query);
  }
}
