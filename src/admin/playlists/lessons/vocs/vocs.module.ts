import { Module } from '@nestjs/common';
import { VocsService } from './vocs.service';
import { VocsController } from './vocs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [VocsController],
  providers: [VocsService],
})
export class VocsModule {}
