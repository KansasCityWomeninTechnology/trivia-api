import { Controller, Get, Query } from '@nestjs/common';
import { Questions } from '../models/trivia.dto';
import { Categories } from '../models/categories.dto';
import { Difficulty } from '../models/difficulty.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseQueryPipe } from '../pipes/parse-query.pipe';
import { Observable } from 'rxjs';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { TriviaService } from '../trivia.service';

@ApiTags('trivia questions')
@Controller('trivia ')
export class TriviaController {
  constructor(private triviaService: TriviaService) {}

  @Get()
  @ApiOkResponse({
    description: 'Trivia questions',
    type: Questions,
  })
  @ApiQuery({
    name: 'category',
    enum: Categories,
    isArray: true,
    required: false,
  })
  @ApiQuery({
    name: 'difficulty',
    enum: Difficulty,
    isArray: true,
    required: false,
  })
  @ApiQuery({ name: 'count', required: false })
  public getQuestions(
    @Query('category', new ParseQueryPipe(Categories)) category,
    @Query('difficulty', new ParseQueryPipe(Difficulty)) difficulty,
    @Query('count', new ParseIntWithDefaultPipe(10)) count,
  ): Observable<Questions> {
    return this.triviaService.getTriviaQuestions(category, difficulty, count);
  }
}
