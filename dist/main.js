"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('main');
    const globalPrefix = '/api';
    app.enableCors();
    if (app_module_1.AppModule.isDev) {
        const swaggerOptions = new swagger_1.DocumentBuilder()
            .setTitle('Nest.Js Jwt Authentication')
            .setDescription('API documentation for Shohel Rana')
            .setVersion('1.0.0')
            .setBasePath(globalPrefix)
            .addBearerAuth({
            description: 'Default JWT Authorization',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'defaultBearerAuth')
            .build();
        const swaggerDoc = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
        swagger_1.SwaggerModule.setup(`${globalPrefix}/swagger`, app, swaggerDoc);
    }
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(app_module_1.AppModule.port);
    let baseUrl = app.getHttpServer().address().address;
    if (baseUrl === '0.0.0.0' || baseUrl === '::') {
        baseUrl = 'localhost';
    }
    logger.log(`Listening to http://${baseUrl}:${app_module_1.AppModule.port}${globalPrefix}`);
    if (app_module_1.AppModule.isDev) {
        logger.log(`Swagger UI: http://${baseUrl}:${app_module_1.AppModule.port}${globalPrefix}/swagger`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map