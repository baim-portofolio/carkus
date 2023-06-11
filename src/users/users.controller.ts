import { Body, Controller, Param, Patch, Delete, Get, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-thread.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { AllowAnonymous } from 'src/auth/guard/AllowAnonymous.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id_user')
  async updateUsers(
    @Param('id_user') id_user: string,
    @Body() data: UpdateUserDto,
  ) {
    return this.usersService.updateUsers(data, id_user);
  }

  @Delete(':id_user')
  async deleteUsers(@Param('id_user') id_user: string) {
    return this.usersService.deleteUsers(id_user);
  }

  @AllowAnonymous()
  @Get()
  async searchUsers(@Query() query: SearchUserDto) {
    return this.usersService.searchUsers(query);
  }

  @AllowAnonymous()
  @Get(':id_user')
  async getOneUsers(@Param('id_user') id_user: string) {
    return this.usersService.findOneUser(id_user);
  }
  
}
