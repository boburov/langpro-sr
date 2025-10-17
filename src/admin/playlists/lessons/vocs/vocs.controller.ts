import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VocsService } from './vocs.service';
import { CreateVocDto } from './dto/create-voc.dto';
import { AdminAccessGuard } from 'src/guards/admin-access/admin-access.guard';

@Controller('playlists/lessons/:lesson_id/vocs')
export class VocsController {
  constructor(private readonly vocsService: VocsService) {}

  @UseGuards(AdminAccessGuard)
  @Post('new')
  create(@Param('lesson_id') lesson_id: string, @Body() data: CreateVocDto) {
    return this.vocsService.create(lesson_id, data);
  }

  @Get('all')
  findAll(@Param('lesson_id') lesson_id: string) {
    return this.vocsService.findAll(lesson_id);
  }

  @Delete(':id/remove')
  remove(@Param('lesson_id') lesson_id: string, @Param('id') id: string) {
    return this.vocsService.remove(lesson_id, id);
  }
}
