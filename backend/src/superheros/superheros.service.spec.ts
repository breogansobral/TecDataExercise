import { Test, TestingModule } from '@nestjs/testing';
import { SuperherosService } from './superheros.service';

describe('SuperherosService', () => {
  let service: SuperherosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperherosService],
    }).compile();

    service = module.get<SuperherosService>(SuperherosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
