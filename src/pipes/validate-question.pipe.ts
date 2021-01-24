import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Answer, Question } from '../models/trivia.dto';

@Injectable()
export class ValidateQuestionPipe implements PipeTransform {
  transform(value: Question, metadata?: ArgumentMetadata) {
    if (!value?.text || !value?.answers) {
      throw new BadRequestException(
        'text property and answers array property are required',
      );
    }

    if (!value.answers.map((answer) => answer.correct).includes(true)) {
      throw new BadRequestException(
        'answers array must include a correct answer',
      );
    }

    if (
      value.text.trim() === '' ||
      value.answers
        .map((answer: Answer) => answer.text.trim())
        .some((t) => t === '')
    ) {
      throw new BadRequestException('text fields must not only be whitespace');
    }
    return value;
  }
}
