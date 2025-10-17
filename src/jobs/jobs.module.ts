import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MailQueue } from './processors/mail/mail.queue';
import { MailProcessor } from './processors/mail/mail.processor';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QUEUE_NAME } from 'src/constants';
import { SeedProcessor } from './processors/admin_seed/seed.processor';
import { SeedQueue } from './processors/admin_seed/seed.queue';

@Module({
  imports: [
    MailerModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
    PrismaModule,
  ],
  providers: [MailQueue, MailProcessor, SeedProcessor, SeedQueue],
  exports: [MailQueue, SeedQueue],
})
export class JobsModule {}
``;
