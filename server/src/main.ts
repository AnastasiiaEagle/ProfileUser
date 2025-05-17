import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser()) 
  app.useGlobalPipes( new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3001', // або '*', якщо хочеш дозволити всім
    credentials: true, // якщо використовуєш кукі
  });

  app.useStaticAssets(join(__dirname, '..','uploads'), {
    prefix: '/uploads/'
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
