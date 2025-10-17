import { Module } from '@nestjs/common';
import { GenerateUniquenameService } from './generate_uniquename/generate_uniquename.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NameSanitizerService } from './name_sanitizer/name_sanitizer.service';

@Module({
  imports: [PrismaModule],
  providers: [GenerateUniquenameService, NameSanitizerService],
  exports: [GenerateUniquenameService, NameSanitizerService],
})
export class GlobalModule {}
