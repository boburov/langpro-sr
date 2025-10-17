import { Injectable } from '@nestjs/common';
import { SearchUserParamsDto } from './dto/search-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: SearchUserParamsDto) {
    const skip = (query.page - 1) * query.limit;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          name: {
            contains: query.name,
            mode: 'insensitive',
          },
          surname: {
            contains: query.surname,
            mode: 'insensitive',
          },
          email: {
            contains: query.email,
            mode: 'insensitive',
          },
        },
        skip,
        take: query.limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count({
        where: {
          name: {
            contains: query.name,
            mode: 'insensitive',
          },
          surname: {
            contains: query.surname,
            mode: 'insensitive',
          },
          email: {
            contains: query.email,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      data,
      meta: {
        total: total,
        page: query.page,
        last_page: Math.ceil(total / query.limit),
      },
    };
  }

  async getById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        courses: {
          select: {
            id: true,
            playlist: true,
          },
        },
      },
    });
  }
}
