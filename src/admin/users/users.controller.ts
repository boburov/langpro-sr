import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminAccessGuard } from 'src/guards/admin-access/admin-access.guard';
import { SearchUserParamsDto } from './dto/search-user.dto';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminAccessGuard)
  @Get('search')
  findAll(@Query() q: SearchUserParamsDto) {
    return this.usersService.search(q);
  }

  @UseGuards(AdminAccessGuard)
  @Get('unique/:id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }
}
