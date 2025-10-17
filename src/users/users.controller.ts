import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShowedDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  getAll() {
    return this.usersService.getAll();
  }

  @Put('update/pfpf/:id')
  @UseInterceptors(FileInterceptor('profile_pic'))
  updatePfpf(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.updatePFP(id, file);
  }

  @Post('verify_mail')
  async verify_mail(
    @Body() dto: { new_mail: string; old_mail: string; code: number },
  ) {
    return this.usersService.verify_mail(dto.new_mail, dto.old_mail, dto.code);
  }

  @Post('change_mail')
  async change_mail(@Body() dto: { oldMail: string; newMail: string }) {
    return this.usersService.change_mail(dto.newMail, dto.oldMail);
  }

  @Put('showed/:userId')
  showed(@Param('userId') userId: string, @Body() body: ShowedDto) {
    return this.usersService.showed(userId, body.courseId, body.lessonId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
