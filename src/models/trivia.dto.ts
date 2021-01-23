import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Answer {
  @IsBoolean()
  correct: boolean;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class Question {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @Type(() => Answer)
  answers: Answer[];
}

export class Questions {
  questions: Question[];
}
