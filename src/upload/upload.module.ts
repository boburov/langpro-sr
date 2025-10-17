import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { GlobalModule } from 'src/global/global.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, GlobalModule],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
