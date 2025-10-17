import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private upload: UploadService,
    private email_service: MailService,
  ) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.prisma.user.findUnique({ where: { id: user.id } });
  }

  async showed(userId: string, courseId: string, lessonId: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (user) {
      return await this.prisma.show_history.create({
        data: {
          userId,
          category_id: courseId,
          lesson_id: lessonId,
        },
      });
    }
  }

  async updatePFP(id: string, profile_pic: Express.Multer.File) {
    const new_pfp = await this.upload.pfp(profile_pic);
    await this.prisma.user.update({
      where: { id },
      data: { profile_pic: new_pfp },
    });
    return this.prisma.user.findUnique({ where: { id } });
  }

  async verify_mail(new_mail: string, old_mail: string, code: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: old_mail },
      });
      if (!user) {
        throw new Error('User not found');
      }

      const verify_token = `http://localhost:3000/dashboard/${user.id}/settings/?code=${code}`;

      await this.email_service.sendVerificationLink(new_mail, verify_token);

      return { message: 'Verification email sent', verify_token };
    } catch (error) {
      console.error(error);
    }
  }

  async change_mail(newMail: string, oldMail: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: oldMail },
    });

    if (!user) throw new Error('User not found');

    const updatedUser = await this.prisma.user.update({
      where: { email: oldMail },
      data: { email: newMail },
    });

    return updatedUser;
  }
}
