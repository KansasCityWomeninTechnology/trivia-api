import { Controller, Get, Param, Req } from '@nestjs/common';
import { sampleQuiz } from './quiz_fixture';
import { getQuiz } from './quiz';

@Controller('')
export class QuizController {

    @Get()
    root(): string {
        return 'hooray! your API is working!';
    }

    @Get('sample')
    sampleQuiz() {
        return sampleQuiz;
    }

    @Get('category/:category')
    getCategory(@Req() request) {
        return getQuiz(request.params);
    }

    @Get('category/:category/difficulty/:difficulty')
    getDifficulty(@Req() request) {
        return getQuiz(request.params);
    }

    @Get('category/:category/difficulty/:difficulty/count/:count')
    getCount(@Req() request) {
        return getQuiz(request.params);
    }
}