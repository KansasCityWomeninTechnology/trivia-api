import { ValidateQuestionPipe } from './validate-question.pipe';
import { Question } from "../models/trivia.dto";
import { BadRequestException } from "@nestjs/common";


describe('ValidateQuestionPipe', () => {
  it('should be defined', () => {
    expect(new ValidateQuestionPipe()).toBeDefined();
  });

  describe('validates', () => {
    const validator = new ValidateQuestionPipe();
    it('should pass validation when question is properly filled out', () => {
      const validQuestion: Question = {
        text: 'hello question',
        answers: [
          { text: 'hello', correct: true },
          { text: 'hello again', correct: true }
        ]
      };

      expect(() => validator.transform(validQuestion)).not.toThrow();
    });

    it('should throw BadRequestException when at least one answer is not marked as correct', () => {
      const invalidQuestion: Question = {
        text: 'hello question',
        answers: [
          { text: 'hello', correct: false },
          { text: 'hello again', correct: false }
        ]
      };

      expect(() => validator.transform(invalidQuestion)).toThrow(BadRequestException)
    });

    it('should throw BadRequestException when question text is whitespace', () => {
      const invalidQuestion: Question = {
        text: ' ',
        answers: [
          { text: 'hello', correct: true },
          { text: 'hello again', correct: false }
        ]
      };

      expect(() => validator.transform(invalidQuestion)).toThrow(BadRequestException)
    });

    it('should throw BadRequestException when answer text is whitespace', () => {
      const invalidQuestion: Question = {
        text: 'hello question',
        answers: [
          { text: ' ', correct: false },
          { text: 'hello again', correct: true }
        ]
      };

      expect(() => validator.transform(invalidQuestion)).toThrow(BadRequestException)
    });
  })
});
