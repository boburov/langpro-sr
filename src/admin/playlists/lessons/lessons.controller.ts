import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AdminAccessGuard } from 'src/guards/admin-access/admin-access.guard';

@Controller('playlists/:unique_name/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(AdminAccessGuard)
  @Post('new')
  create(
    @Param('unique_name') unique_name: string,
    @Body() data: CreateLessonDto,
  ) {
    return this.lessonsService.create(unique_name, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Param('unique_name') unique_name: string,
    @Body() data: UpdateLessonDto,
  ) {
    return this.lessonsService.update(unique_name, id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('unique_name') unique_name: string) {
    return this.lessonsService.remove(unique_name, id);
  }
}
