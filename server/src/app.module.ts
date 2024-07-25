// https://dbdiagram.io/d/62411640bed618387309ee20


import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
/* import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { CategoryModule } from './category/category.module';
import { QuizModule } from './quiz/quiz.module'; 
import { OwnerModule } from './owner/owner.module';
import { TenantModule } from './tenant/tenant.module';
*/
import { CommonModule } from './common/common.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { AppartmentModule } from './appartment/appartment.module';
import { BuildingModule } from './building/building.module';

import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ProductOnOrderModule } from './product-on-order/product-on-order.module';

import { SharedModule } from './shared/shared.module';
import { freemem } from 'os';



@Module({
  imports: [
    CoreModule,
    //QuestionModule,
    //AnswerModule,
    //CategoryModule,
    //QuizModule,
    CommonModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PassportModule.register({ session: true }),
    AppartmentModule,
    BuildingModule,
    ProductModule,
    OrderModule,
    ProductOnOrderModule,
    SharedModule,
    //TenantModule

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'angular'),
    }),
    
  ]
})
export class AppModule {}
