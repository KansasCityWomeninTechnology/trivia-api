import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';

@Module({
  imports: [],
  controllers: [QuizController],
})
export class AppModule {}
