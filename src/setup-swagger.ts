import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion(process.env.API_VERSION ?? '1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customJs: '',
  });
}

export function ignoreCsrfForSwaggerRequest() {
  return function (req: Request, _res: Response, next: NextFunction) {
    const isSwaggerRequest = req.headers.referer?.endsWith?.('/swagger');
    if (isSwaggerRequest) {
      req.ignoreCsrf = true;
    }

    next();
  };
}
