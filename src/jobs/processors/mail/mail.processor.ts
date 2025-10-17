import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAME } from 'src/constants';

@Processor(QUEUE_NAME)
export class MailProcessor extends WorkerHost {
  async process(job: Job, email: string): Promise<any> {
    if (job.name === 'send_email_verification') {
      setTimeout(() => {
        console.log(`sending mail to ${email}`);
      }, 2000);
    }
  }
}
