import { Test, TestingModule } from '@nestjs/testing';
import { Opentdb } from './opentdb';
import { HttpModule } from "@nestjs/common";

describe('Opentdb', () => {
  let provider: Opentdb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [Opentdb],
    }).compile();

    provider = module.get<Opentdb>(Opentdb);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
