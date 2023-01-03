import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Injector from './injector';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // // app.useGlobalPipes(new ValidationPipe());

  // await app.listen(3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);

  await new Injector().inject(AppModule);
}
bootstrap();
