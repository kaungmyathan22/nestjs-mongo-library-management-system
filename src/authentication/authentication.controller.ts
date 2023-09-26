import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';
import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';
import { RegisterDto } from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('api/v1/authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authenticationService.register(payload);
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @CurrentUser() user: UserDocument) {
    const token = await this.authenticationService.getAccessToken(
      req.user as UserDocument,
    );
    req.res.setHeader('Set-Cookie', [
      this.cookieService.getCookieWithJwtToken(token),
    ]);
    return { user, token };
  }
  // @Patch('change-password')
  // changePassword(@Body() payload: CreateAuthenticationDto) {
  //   return this.authenticationService.create(payload);
  // }
  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  me(@CurrentUser() user: UserDocument) {
    return user;
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  logout() {
    return this.authenticationService.logout();
  }
  // @Delete('delete-account')
  // deleteAccount(@Body() payload: CreateAuthenticationDto) {
  //   return this.authenticationService.create(payload);
  // }
}
