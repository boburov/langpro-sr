import { Test, TestingModule } from '@nestjs/testing';
import { NameSanitizerService } from './name_sanitizer.service';

describe('NameSanitizerService', () => {
  let service: NameSanitizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NameSanitizerService],
    }).compile();

    service = module.get<NameSanitizerService>(NameSanitizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
