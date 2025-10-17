import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { VocsModule } from './vocs/vocs.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret',
      signOptions: { expiresIn: '7d' },
    }),
    VocsModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
