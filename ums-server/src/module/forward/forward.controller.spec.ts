import { Test, TestingModule } from '@nestjs/testing';
import { ForwardController } from './forward.controller';
import { ForwardService } from './forward.service';

describe('ForwardController', () => {
  let controller: ForwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForwardController],
      providers: [ForwardService],
    }).compile();

    controller = module.get<ForwardController>(ForwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
