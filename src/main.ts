import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { csrf } from './common/csrf';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * will transform payload to class instance
       */
      transform: true,
    }),
  );

  /**
   * Configure Swagger
   */
  setupSwagger(app);

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(csrf());
  await app.listen(3000);
}
bootstrap();
