import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async getHistoryWithLessons(userId: string) {
    return this.prisma.show_history.findMany({
      where: { userId },
      orderBy: { showed_at: 'desc' },
      select: {
        showed_at: true,
        lesson: {
          select: {
            id: true,
            title: true,
            video_url: true,
            playlist: { select: { thumbnail: true } },
          },
        },
      },
    });
  }

  async write_history(userId: string, category_id: string, lesson_id: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    const category = await this.prisma.playlist.findFirst({
      where: { id: category_id },
    });

    const lesson = await this.prisma.lessons.findFirst({
      where: { id: lesson_id },
    });

    if (!user || !category || !lesson)
      throw new HttpException('Bu narsa mavjud emas', 404);

    const new_history = await this.prisma.show_history.create({
      data: {
        userId,
        lesson_id,
        category_id,
      },
    });
    return { message: "ko'rildi", new_history };
  }
}
