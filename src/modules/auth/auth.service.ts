import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto, LoginResponseDto, ProfileDto } from './dtos';
import { HttpResponse } from 'src/types';
import { returnObjects } from 'src/utils/funcs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: LoginRequestDto): Promise<any> {
    const { username, password } = payload;

    const user = await this.userRepository.findOne({ where: { username } });

    if (user && password === user.password) {
      const result = { username: user.username, id: user.id };
      return result;
    }
    return null;
  }

  async login(user: UserEntity): Promise<HttpResponse<LoginResponseDto>> {
    const payload = { username: user.username, sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);
    return returnObjects({ access_token });
  }

  async profile(username: string): Promise<HttpResponse<ProfileDto>> {
    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    delete foundUser.password;

    return returnObjects(foundUser);
  }
}
