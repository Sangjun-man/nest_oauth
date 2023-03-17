import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import console from 'console';
import { JWTExceptionFilter } from './global/filter/jwt-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: console,
  });

  app.useGlobalFilters(new JWTExceptionFilter());

  app.use(cookieParser());
  await app.listen(5001);
}
bootstrap();
