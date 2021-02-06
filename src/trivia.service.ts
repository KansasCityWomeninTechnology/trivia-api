import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Opentdb } from './providers/opentdb';
import { Observable, of } from 'rxjs';
import { Question, Questions } from './models/trivia.dto';
import { CURATED_QUESTIONS } from './models/curated-questions.entity';

@Injectable()
export class TriviaService {
  constructor(private opentdbService: Opentdb) {}

  public getTriviaQuestions(
    categories: string[],
    difficulty: string[],
    count,
  ): Observable<Questions> {
    return this.opentdbService.getTriviaQuestions(
      categories,
      difficulty,
      count,
    );
  }

  public getCuratedTriviaQuestions(): Observable<Question[]> {
    return of(CURATED_QUESTIONS.questions);
  }

  public getCuratedTriviaQuestion(
    sequenceNumber: number,
  ): Observable<Question> {
    const question = CURATED_QUESTIONS.questions[sequenceNumber - 1];

    if (!question) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return of(question);
  }
}
