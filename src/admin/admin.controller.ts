import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminAccessGuard } from 'src/guards/admin-access/admin-access.guard';
import { UpdatePasswordDto } from './dtos/password-update.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('verify')
  verifyAdmin(@Body('password') password: string) {
    return this.adminService.VerifyAdmin(password);
  }

  @UseGuards(AdminAccessGuard)
  @Put('update_password')
  updatePassword(@Body() data: UpdatePasswordDto) {
    return this.adminService.updatePassword(data);
  }

  @UseGuards(AdminAccessGuard)
  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }
}
