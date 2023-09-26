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
  changePassword(
    @Req() req: Request,
    @Body() payload: ChangePasswordDTO,
    @CurrentUser() user: UserDocument,
  ) {
    req.res.setHeader('Set-Cookie', this.cookieService.getCookieForLogOut());
    return this.authenticationService.changePassword(user, payload);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  me(@CurrentUser() user: UserDocument) {
    return user;
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    req.res.setHeader('Set-Cookie', this.cookieService.getCookieForLogOut());
    return this.authenticationService.logout();
  }

  @Delete('delete-account')
  deleteAccount(@CurrentUser() user: UserDocument) {
    return this.authenticationService.deleteAccount(user);
  }
}
