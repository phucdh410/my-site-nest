import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos';
import { Public } from 'src/system/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() request: LoginRequestDto) {
    const user = await this.authService.validateUser(request);

    if (!user) {
      throw new UnauthorizedException('Username hoặc password không hợp lệ.');
    }

    return this.authService.login(user);
  }

  @Get('get-profile')
  async getProfile(@Req() req: any) {
    const username = req['user'].username;

    return this.authService.profile(username);
  }

  @Get('logout')
  async logout(@Req() req: any) {
    const username = req['user'].username;

    return this.authService.logout(username);
  }
}
