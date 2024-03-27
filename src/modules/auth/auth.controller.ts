import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() request: LoginRequestDto) {
    const user = await this.authService.validateUser(request);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
