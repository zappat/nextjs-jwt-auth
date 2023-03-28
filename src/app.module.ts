import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: ConfigurationService.mongoUri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true, // this property not required
      }),
      inject: [],
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _configService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(_configService.port);
    AppModule.isDev = _configService.isDevelopment;
  }

  private static normalizePort(val: number | string): number | string {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

    if (Number.isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    throw new Error(`Port "${val}" is invalid.`);
  }
}
