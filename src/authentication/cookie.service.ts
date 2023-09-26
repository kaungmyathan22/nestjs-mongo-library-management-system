import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}
  getCookieWithJwtToken(token: string) {
    const cookieJwtKey = this.configService.get(
      EnvironmentConstants.COOKIE_JWT_ACCESS_KEY,
    );
    const cookieJwtExpiresIn = +this.configService.get(
      EnvironmentConstants.JWT_ACCESS_EXPIRES_IN,
    );
    return `${cookieJwtKey}=${token}; HttpOnly; Path=/; Max-Age=${cookieJwtExpiresIn}`;
  }

  getCookieForLogOut() {
    const cookieJwtKey = this.configService.get(
      EnvironmentConstants.COOKIE_JWT_ACCESS_KEY,
    );

    return [`${cookieJwtKey}=; HttpOnly; Path=/; Max-Age=0`];
  }
}
