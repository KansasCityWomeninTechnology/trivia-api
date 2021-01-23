import { Test, TestingModule } from '@nestjs/testing';
import { TriviaController } from './trivia.controller';
import { TriviaService } from "../trivia.service";
import { Opentdb } from "../providers/opentdb";
import { HttpModule } from "@nestjs/common";

describe('TriviaController', () => {
  let controller: TriviaController;
  let triviaService: TriviaService;
  let opentdbService: Opentdb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TriviaController],
      providers: [TriviaService, Opentdb]
    }).compile();

    triviaService = await module.resolve(TriviaService);
    opentdbService = await module.resolve(Opentdb);
    controller = module.get<TriviaController>(TriviaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
