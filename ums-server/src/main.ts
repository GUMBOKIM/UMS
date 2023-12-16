import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sessionConfig } from './config/session.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await sessionConfig(app);
  await app.listen(3001);
}

bootstrap();
