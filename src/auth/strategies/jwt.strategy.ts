import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadDto } from './../jwt-payload.dto';
import { ConfigurationService } from './../../shared/configuration/configuration.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigurationService.JWT.Key,
    });
  }

  async validate(jwtPayloadDto: JwtPayloadDto): Promise<JwtPayloadDto> {
    return jwtPayloadDto;
  }
}
