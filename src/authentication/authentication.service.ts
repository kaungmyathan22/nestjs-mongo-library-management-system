import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}
  async register(payload: RegisterDto) {
    return this.usersService.create(payload);
  }
  async login({ email, password }: LoginDTO) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email / password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email / password');
    }
    return user;
  }
  async logout() {
    return { success: true };
  }
  // async changePassword() {
  //   const user = await this.usersService.find
  // }
  // async deletAccount() {}
  // async me() {}
}
