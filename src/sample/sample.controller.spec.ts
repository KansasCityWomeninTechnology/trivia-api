import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './sample.controller';
import { TriviaService } from "../trivia.service";
import { Opentdb } from "../providers/opentdb";
import { HttpModule } from "@nestjs/common";

describe('SampleController', () => {
  let controller: SampleController;
  let triviaService: TriviaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SampleController],
      providers: [TriviaService, Opentdb]
    }).compile();

    triviaService = await module.resolve(TriviaService);
    controller = module.get<SampleController>(SampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
