// import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // await app.listen(3000);
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  await app.listen(3000);
}
bootstrap();
