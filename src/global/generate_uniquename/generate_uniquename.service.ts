import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenerateUniquenameService {
  constructor(private prisma: PrismaService) {}

  async generate(name: string) {
    let baseUsername = name
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    let unique_name = baseUsername;
    let isUnique = false;

    while (!isUnique) {
      const playlist = await this.prisma.playlist.findUnique({
        where: { unique_name: unique_name },
      });
      if (!playlist) {
        isUnique = true;
      } else {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        unique_name = `${baseUsername}${randomSuffix}`;
      }
    }
    return unique_name;
  }
}
