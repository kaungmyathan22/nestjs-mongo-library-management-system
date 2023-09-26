import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('api/v1/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authenticationService.register(payload);
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }
  // @Patch('change-password')
  // changePassword(@Body() payload: CreateAuthenticationDto) {
  //   return this.authenticationService.create(payload);
  // }
  // @Get('me')
  // me(@Body() payload: CreateAuthenticationDto) {
  //   return this.authenticationService.create(payload);
  // }
  // @Get('logout')
  // logout(@Body() payload: CreateAuthenticationDto) {
  //   return this.authenticationService.create(payload);
  // }
  // @Delete('delete-account')
  // deleteAccount(@Body() payload: CreateAuthenticationDto) {
  //   return this.authenticationService.create(payload);
  // }
}
