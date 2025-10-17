import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
    private mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    console.log('user ochirildi');

    return this.prisma.user.deleteMany({ where: { is_verified: false } });
  }

  async generateTokens(user: any) {
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      profile_pic: user.profile_pic,
    };

    const access = this.jwt.sign(payload, {
      expiresIn: '7d',
      secret: this.config.getOrThrow('JWT_SECRET'),
    });

    const refresh = this.jwt.sign(
      { userId: user.id },
      {
        expiresIn: '7d',
        secret: this.config.getOrThrow('JWT_SECRET'),
      },
    );

    return { access, refresh };
  }

  async validateGoogleUser(userData: {
    google_id: string;
    email: string;
    name: string;
    surname: string;
    picture: string;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (user) {
      user = await this.prisma.user.update({
        where: { email: userData.email },
        data: {
          name: userData.name,
          surname: userData.surname,
          profile_pic: userData.picture,
          is_verified: true,
        },
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          google_id: userData.google_id,
          email: userData.email,
          name: userData.name,
          surname: userData.surname,
          profile_pic: userData.picture,
          is_verified: true,
        },
      });
    }

    const tokens = await this.generateTokens(user);
    return { user, ...tokens }; // req.user shu formatda keladi
  }

  async googleRedirect(user: any) {
    const redirectUrl = `${this.config.getOrThrow(
      'FRONTEND_URL',
    )}/auth/verify?token=${user.access}&refresh=${user.refresh}`;

    return redirectUrl;
  }

  async refresh(token: string) {
    try {
      const decoded = this.jwt.verify(token, {
        secret: this.config.getOrThrow('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });
      if (!user) throw new HttpException('User topilmadi', 404);

      return this.generateTokens(user);
    } catch {
      throw new HttpException(
        'Refresh token noto‘g‘ri yoki muddati tugagan',
        401,
      );
    }
  }

  async profile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        courses: true,
        show_history: true,
      },
    });
  }

  async register(dto: CreateAuthDto) {
    const { name, email, surname } = dto;

    const exist = await this.prisma.user.findUnique({ where: { email } });
    if (exist) throw new HttpException('Bu user mavjud', 409);

    const user = await this.prisma.user.create({
      data: { name, surname, email, is_verified: false },
    });

    const verifyToken = this.generateTokens(user);

    const magicLink = `${this.config.getOrThrow('VERIFY_EMAIL_URL')}${verifyToken}`;
    await this.mailService.sendVerificationLink(email, magicLink);

    return {
      message: 'Emailingizga tasdiqlash linki yuborildi',
    };
  }

  async login(email) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new HttpException('Bunday user mavjud emas', 404);
    }

    const tokens = await this.generateTokens(user);

    return {
      access_token: tokens.access,
      refresh_token: tokens.refresh,
      user: user,
    };
  }

  async verify(token: string) {
    try {
      const decoded: any = this.jwt.verify(token, {
        secret: this.config.getOrThrow('JWT_SECRET'),
      });

      let user: User | null = null;

      if (decoded.email) {
        user = await this.prisma.user.update({
          where: { email: decoded.email },
          data: { is_verified: true },
        });
      } else if (decoded.userId) {
        user = await this.prisma.user.update({
          where: { id: decoded.userId },
          data: { is_verified: true },
        });
      }

      if (!user) {
        throw new HttpException('User topilmadi', 404);
      }

      const tokens = await this.generateTokens(user);

      return {
        message: 'User tasdiqlandi ✅',
        user,
        ...tokens,
      };
    } catch (err) {
      throw new HttpException('Invalid or expired token', 400);
    }
  }
}
