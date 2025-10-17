import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QUEUE_NAME } from 'src/constants';

@Injectable()
export class MailQueue {
  constructor(@InjectQueue(QUEUE_NAME) private mailQueue: Queue) {}

  async sendVerificationMail(email: string) {
    await this.mailQueue.add('send_email_verification', email);
  }
}
