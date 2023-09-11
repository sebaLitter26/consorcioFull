// https://dbdiagram.io/d/62411640bed618387309ee20


import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { CategoryModule } from './category/category.module';
import { QuizModule } from './quiz/quiz.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppartmentModule } from './appartment/appartment.module';
import { BuildingModule } from './building/building.module';
import { OwnerModule } from './owner/owner.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    CoreModule,
    QuestionModule,
    AnswerModule,
    CategoryModule,
    QuizModule,
    CommonModule,
    UserModule,
    AuthModule,
    AppartmentModule,
    BuildingModule,
    OwnerModule,
    TenantModule
    
  ]
})
export class AppModule {}
