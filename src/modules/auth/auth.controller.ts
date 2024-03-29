import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() request: LoginRequestDto) {
    const user = await this.authService.validateUser(request);

    if (!user) {
      throw new UnauthorizedException('Username hoặc password không hợp lệ.');
    }

    return this.authService.login(user);
  }

  @Get('get-profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: any) {
    const username = req['user'].username;

    return this.authService.profile(username);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: any) {
    const username = req['user'].username;

    return this.authService.logout(username);
  }
}
