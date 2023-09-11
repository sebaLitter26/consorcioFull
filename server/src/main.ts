import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './interceptors/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Validators
  app.useGlobalPipes(new ValidationPipe());

  //Global Error Handling
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter
    //, {P2022: HttpStatus.BAD_REQUEST,}
  ));


  await app.listen(process.env.PORT || 5000);
}
bootstrap();
