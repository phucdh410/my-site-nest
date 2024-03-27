import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
