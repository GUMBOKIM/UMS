import { sessionConfig } from '@config/session.config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await sessionConfig(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}

bootstrap();
