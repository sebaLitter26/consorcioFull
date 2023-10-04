import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './interceptors/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
/*
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  }); */

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
