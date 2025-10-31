import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //валидация
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //удаляет поля, не описанные в DTO
    forbidNonWhitelisted: true, //выводит ошибку, если есть лишние поля
    transform: true, //преобразует типы данных
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
