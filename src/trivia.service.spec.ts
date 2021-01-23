import { Test, TestingModule } from '@nestjs/testing';
import { TriviaService } from './trivia.service';
import { Opentdb } from "./providers/opentdb";
import { HttpModule } from "@nestjs/common";

describe('TriviaService', () => {
  let service: TriviaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TriviaService, Opentdb],
    }).compile();

    service = module.get<TriviaService>(TriviaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
