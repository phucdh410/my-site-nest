import { Controller, Get, Header, HttpCode, Param } from '@nestjs/common';
import { GetUsersParamsDto } from './dtos';

@Controller('users')
export class UsersController {
  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  findAll(@Param() params: GetUsersParamsDto): string {
    console.log('🚀 ~ UsersController ~ findAll ~ params:', params);
    return 'This action returns all users';
  }
}
