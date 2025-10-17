import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dtos/password-update.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async VerifyAdmin(password: string) {
    const admin = await this.prisma.admin.findFirst();
    if (!admin) {
      throw new HttpException('Admin is not seeded yet', 404);
    }
    const is_ok = bcryptjs.compareSync(password, admin.password);
    if (!is_ok) {
      throw new HttpException("Parol notog'ri", 404);
    }
    const access_token = await this.jwt.sign({ access: true, role: 'admin' });
    return {
      access_token,
    };
  }

  async updatePassword(data: UpdatePasswordDto) {
    const admin = await this.prisma.admin.findFirst();
    if (!admin) {
      throw new HttpException('Admin is not seeded yet', 404);
    }
    const is_ok = bcryptjs.compareSync(data.old_password, admin.password);
    if (!is_ok) {
      throw new HttpException("Eski parol notog'ri", 404);
    }
    if (data.new_password !== data.password_conf) {
      throw new HttpException(
        'Yangi parol, tasdiqlangan parolga teng emas',
        404,
      );
    }
    const password = bcryptjs.hashSync(data.new_password, 10);
    await this.prisma.admin.update({
      where: { id: admin.id },
      data: {
        password,
      },
    });
    return { message: "Paro'l, muaffaqiyatli o'zgartirildi" };
  }

  async getStats() {
    const total_users = await this.prisma.user.count();
    const total_playlists = await this.prisma.playlist.count();
    const total_vocabulary = await this.prisma.vocabulary.count();
    const total_lessons = await this.prisma.lessons.count();

    const data = await this.prisma.playlist.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
    });

    return {
      total_users,
      total_playlists,
      total_lessons,
      total_vocabulary,
      data,
    };
  }
}
