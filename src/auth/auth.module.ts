import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationService } from './../shared/configuration/configuration.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: ConfigurationService.JWT.Key,
        signOptions: { expiresIn: ConfigurationService.JWT.AccessTokenTtl },
      }),
    }),
  ],
})
export class AuthModule {}
