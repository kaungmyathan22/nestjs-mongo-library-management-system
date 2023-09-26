import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';
import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
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

  @UseGuards(JwtAuthenticationGuard)
  @Patch('change-password')
  async changePassword(
    @Req() req: Request,
    @Body() payload: ChangePasswordDTO,
    @CurrentUser() user: UserDocument,
  ) {
    const result = await this.authenticationService.changePassword(
      user,
      payload,
    );
    req.res.setHeader('Set-Cookie', this.cookieService.getCookieForLogOut());
    return result;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    const result = await this.authenticationService.logout();
    req.res.setHeader('Set-Cookie', this.cookieService.getCookieForLogOut());
    return result;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('delete-account')
  async deleteAccount(@Req() req: Request, @CurrentUser() user: UserDocument) {
    const result = await this.authenticationService.deleteAccount(user);
    req.res.setHeader('Set-Cookie', this.cookieService.getCookieForLogOut());
    return result;
  }
}
