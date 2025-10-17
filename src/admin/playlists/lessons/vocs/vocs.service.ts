import { Injectable } from '@nestjs/common';
import { CreateVocDto } from './dto/create-voc.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VocsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(lesson_id: string, data: CreateVocDto) {
    const new_voc = await this.prisma.vocabulary.create({
      data: {
        ...data,
        lesson: {
          connect: {
            id: lesson_id,
          },
        },
      },
    });
    return new_voc;
  }

  async findAll(lesson_id: string) {
    return await this.prisma.vocabulary.findMany({
      where: { lessonsId: lesson_id },
    });
  }

  async remove(lesson_id: string, id: string) {
    await this.prisma.vocabulary.delete({
      where: { id: id, lessonsId: lesson_id },
    });
    return {
      deleted: true,
    };
  }
}
