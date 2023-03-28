import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from './../user/entity/users.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from './../shared/configuration/configuration.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory: () => ({
        defaultStrategy: 'jwt',
      }),
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: ConfigurationService.JWT.Key,
        signOptions: { expiresIn: ConfigurationService.JWT.AccessTokenTtl },
      }),
    }),
    MongooseModule.forFeature([
      { name: User.modelName, schema: User.model.schema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
