import { Test, TestingModule } from '@nestjs/testing';
import { VocsController } from './vocs.controller';
import { VocsService } from './vocs.service';

describe('VocsController', () => {
  let controller: VocsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocsController],
      providers: [VocsService],
    }).compile();

    controller = module.get<VocsController>(VocsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
