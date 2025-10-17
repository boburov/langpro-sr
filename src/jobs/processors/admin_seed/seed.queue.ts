import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QUEUE_NAME } from 'src/constants';

@Injectable()
export class SeedQueue {
  constructor(@InjectQueue(QUEUE_NAME) private readonly seedQueue: Queue) {}

  async SeedAdmin(password: string) {
    console.log("in queue");
    
    await this.seedQueue.add('seed_admin', { password });
  }
}
