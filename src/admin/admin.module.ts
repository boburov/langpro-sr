import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret',
      signOptions: { expiresIn: '2d' },
    }),
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
