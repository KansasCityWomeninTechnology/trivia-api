import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TriviaService } from '../trivia.service';
import { Question, Questions } from '../models/trivia.dto';
import { Observable } from 'rxjs';
import { ValidateQuestionPipe } from '../pipes/validate-question.pipe';

@ApiTags('sample trivia questions')
@Controller('sampleQuestions')
export class SampleController {
  constructor(private triviaService: TriviaService) {}

  @Get()
  @ApiOkResponse({
    description: 'Curated list of trivia questions',
    type: Questions,
  })
  public sampleQuiz(): Observable<Questions> {
    return this.triviaService.getCuratedTriviaQuestions();
  }

  @Get(':sequenceNumber')
  @ApiOkResponse({
    description:
      'A question within the list of curated questions by sequence number',
    type: Question,
  })
  @ApiNotFoundResponse({ description: 'Sequence number not found' })
  public sampleQuizQuestion(
    @Param(
      'sequenceNumber',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    index: number,
  ): Observable<Question> {
    return this.triviaService.getCuratedTriviaQuestion(index);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Successful addition of a new trivia question',
    type: Question,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  public addQuestion(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
      }),
      new ValidateQuestionPipe(),
    )
    question: Question,
  ) {
    return question;
  }

  @Delete(':sequenceNumber')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Successful delete of a question by sequence number',
  })
  @ApiNotFoundResponse({ description: 'Sequence number not found' })
  public deleteSampleQuizQuestion(
    @Param(
      'sequenceNumber',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    index: number,
  ): void {
    return;
  }

  @Put(':sequenceNumber')
  @ApiOkResponse({
    description: 'Successful update of a question by sequence number',
    type: Question,
  })
  @ApiNotFoundResponse({ description: 'Sequence number not found' })
  public updateSampleQuizQuestion(
    @Param(
      'sequenceNumber',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    index: number,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
      }),
      new ValidateQuestionPipe(),
    )
    question: Question,
  ): Question {
    return question;
  }
}
