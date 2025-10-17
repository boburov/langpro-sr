import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAME } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';

@Processor(QUEUE_NAME)
export class SeedProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    if (job.name === 'seed_admin') {
      const { password } = job.data;

      console.log('in processor');

      const existing_admin = await this.prisma.admin.findFirst();

      if (!existing_admin) {
        const hashed_password = bcryptjs.hashSync(password, 10);

        await this.prisma.admin.create({
          data: {
            password: hashed_password,
          },
        });

        console.log('New admin seeded');
      } else {
        console.log('Admin already present');
      }
    }
  }
}
