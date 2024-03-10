import { Test, TestingModule } from '@nestjs/testing';
import { SuperherosController } from './superheros.controller';

describe('SuperherosController', () => {
  let controller: SuperherosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperherosController],
    }).compile();

    controller = module.get<SuperherosController>(SuperherosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
