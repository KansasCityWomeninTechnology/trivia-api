import { HttpService, Injectable } from '@nestjs/common';
import { Answer, Question, Questions } from '../models/trivia.dto';
import { Categories } from '../models/categories.dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Result {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

@Injectable()
export class Opentdb {
  private readonly categoryMap = new Map();

  constructor(private httpService: HttpService) {
    this.categoryMap.set(Categories.General, [9]);
    this.categoryMap.set(Categories.Entertainment, [
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      26,
    ]);
    this.categoryMap.set(Categories.Science, [17, 18, 19, 27, 28]);
    this.categoryMap.set(Categories.Nature, [17, 27]);
    this.categoryMap.set(Categories.Arts, [10, 11, 12, 13, 25]);
    this.categoryMap.set(Categories.History, [23, 24]);
  }

  public getTriviaQuestions(
    categories: string[],
    difficulty: string[],
    count,
  ): Observable<Questions> {
    let params = new URLSearchParams();
    params = this.mapCategories(categories, params);
    params = this.mapDifficulty(difficulty, params);
    params = this.mapCount(count, params);

    return this.httpService
      .get('https://opentdb.com/api.php?type=multiple&' + params.toString())
      .pipe(map((res) => this.mapResponse(res.data)));
  }

  private mapCategories(
    categories: string[],
    searchParams: URLSearchParams,
  ): URLSearchParams {
    const requestedCategories = categories.map((el) =>
      this.categoryMap.get(el),
    );

    for (const el of requestedCategories) {
      searchParams.append('category', el);
    }

    return searchParams;
  }

  private mapDifficulty(
    difficulty: string[],
    searchParams: URLSearchParams,
  ): URLSearchParams {
    for (const el of difficulty) {
      searchParams.append('difficulty', el);
    }

    return searchParams;
  }

  private mapCount(
    count: number,
    searchParams: URLSearchParams,
  ): URLSearchParams {
    searchParams.append('amount', count.toString());
    return searchParams;
  }

  private mapResponse(res: { results: Result[] }): Questions {
    if (!res && !res.results) return {} as Questions;

    const questions = res.results.map((el) => {
      const answers = el.incorrect_answers.map((ans) => {
        return { text: ans, correct: false } as Answer;
      });

      answers.unshift({ text: el.correct_answer, correct: true });

      return { text: el.question, answers } as Question;
    });

    return { questions } as Questions;
  }
}
