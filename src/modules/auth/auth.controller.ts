import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos';
import { UserEntity } from 'src/entities';

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

  @Get('get-profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@GetUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
