import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TriviaController } from './trivia/trivia.controller';
import { Opentdb } from './providers/opentdb';
import { TriviaService } from './trivia.service';
import { SampleController } from './sample/sample.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, TriviaController, SampleController],
  providers: [Opentdb, TriviaService],
})
export class AppModule {}
