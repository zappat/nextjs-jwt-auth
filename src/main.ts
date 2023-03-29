import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const logger = new Logger('main');
  const globalPrefix = '/api';

  app.enableCors();

  if (AppModule.isDev) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('Nest.Js Jwt Authentication')
      .setDescription('API documentation for Shohel Rana')
      .setVersion('1.0.0')
      .setBasePath(globalPrefix)
      .addBearerAuth(
        {
          description: 'Default JWT Authorization',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'defaultBearerAuth',
      )
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(`${globalPrefix}/swagger`, app, swaggerDoc);
  }

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', 'assets'));

  await app.listen(AppModule.port);

  let baseUrl = app.getHttpServer().address().address;
  if (baseUrl === '0.0.0.0' || baseUrl === '::') {
    baseUrl = 'localhost';
  }
  logger.log(`Listening to http://${baseUrl}:${AppModule.port}${globalPrefix}`);
  if (AppModule.isDev) {
    logger.log(
      `Swagger UI: http://${baseUrl}:${AppModule.port}${globalPrefix}/swagger`,
    );
  }
}
bootstrap();
