// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// https://gabrieltanner.org/blog/nestjs-realtime-chat

// async function bootstrap() {
//   const PORT = 3000;
//   const app = await NestFactory.create(AppModule);
//   await app.listen(PORT);
//   console.log(`Server started at http://localhost:${PORT}/`)
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  // app.enableCors();
  await app.listen(PORT);
  console.log(`Server started at http://localhost:${PORT}/`)

}
bootstrap();