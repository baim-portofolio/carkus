import { Body, Controller, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-thread.dto';

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
}
