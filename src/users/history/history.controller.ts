import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':userId')
  async getUserHistory(@Param('userId') userId: string) {
    return this.historyService.getHistoryWithLessons(userId);
  }

  @Post('show')
  async show(
    @Body() dto: { userId: string; category_id: string; lesson_id: string },
  ) {
    return this.historyService.write_history(
      dto.userId,
      dto.category_id,
      dto.lesson_id,
    );
  }
}
