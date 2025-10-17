import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const password: string = String(process.env.DEFAULT_ADMIN_PASSWORD);
    const existing_admin = await this.prisma.admin.findFirst();

    if (!existing_admin) {
      const hashed_password = bcryptjs.hashSync(password, 10);
      await this.prisma.admin.create({
        data: {
          password: hashed_password,
        },
      });
      console.log('New admin seeded');
    } else {
      console.log('Admin already present');
    }
  }

  getHello(): string {
    return 'EEEEEEE engni skey!';
  }
}
