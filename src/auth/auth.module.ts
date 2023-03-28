import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './../user/entity/users.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from './../shared/configuration/configuration.service';

@Module({
  imports: [
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
  providers: [AuthService],
})
export class AuthModule {}
