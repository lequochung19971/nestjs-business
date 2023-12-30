import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { csrf } from './common/csrf';
import { setupSwagger, ignoreCsrfForSwaggerRequest } from './setup-swagger';
import 'src/common/query-build-methods';

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
  app.use(ignoreCsrfForSwaggerRequest());
  await app.listen(3000);
}
bootstrap();
