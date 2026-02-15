import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/Interceptors/logging.interceptor';
import { TransformResponse } from './common/Interceptors/transform.interceptor';
import { ExceptionFilterInterceptor } from './common/filters/exceptionFilter.filter';
import { TimeoutInterceptor } from './common/Interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor()); 
  app.useGlobalInterceptors(new TransformResponse());
  app.useGlobalFilters(new ExceptionFilterInterceptor());   
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
