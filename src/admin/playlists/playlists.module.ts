import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { GlobalModule } from 'src/global/global.module';
import { UploadModule } from 'src/upload/upload.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret',
      signOptions: { expiresIn: '7d' },
    }),
    GlobalModule,
    UploadModule,
    LessonsModule,
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
