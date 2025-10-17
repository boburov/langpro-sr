import { Test, TestingModule } from '@nestjs/testing';
import { VocsService } from './vocs.service';

describe('VocsService', () => {
  let service: VocsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocsService],
    }).compile();

    service = module.get<VocsService>(VocsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
