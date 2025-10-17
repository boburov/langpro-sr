import { Test, TestingModule } from '@nestjs/testing';
import { GenerateUniquenameService } from './generate_uniquename.service';

describe('GenerateUniquenameService', () => {
  let service: GenerateUniquenameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateUniquenameService],
    }).compile();

    service = module.get<GenerateUniquenameService>(GenerateUniquenameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
