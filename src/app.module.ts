import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';
import { AdminModule } from './admin/admin.module';
import { JobsModule } from './jobs/jobs.module';
import { PlaylistsModule } from './admin/playlists/playlists.module';
import { GlobalModule } from './global/global.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    MailModule,
    UploadModule,
    AdminModule,
    JobsModule,
    PlaylistsModule,
    GlobalModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
