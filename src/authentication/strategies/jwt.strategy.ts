import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const cookieToken =
          req.cookies[
            configService.get(EnvironmentConstants.COOKIE_JWT_ACCESS_KEY)
          ];
        const headerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        console.log({ headerToken, cookieToken });
        return headerToken || cookieToken;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get(EnvironmentConstants.JWT_ACCESS_SECRET),
    });
  }

  async validate(payload: JWTPaylaod) {
    console.log(payload);
    return this.userService.findByEmail(payload.email);
  }
}
