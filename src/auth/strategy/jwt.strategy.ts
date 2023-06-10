import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return {
      id_user: payload.id,
      username: payload.username,
      role: payload.role,
    };
  }
}
