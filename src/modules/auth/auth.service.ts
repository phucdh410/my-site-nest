import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionEntity, UserEntity } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  GeneratePayloadDto,
  GeneratedTokenDto,
  LoginRequestDto,
  LoginResponseDto,
  ProfileDto,
} from './dtos';
import { HttpResponse } from 'src/types';
import { returnObjects } from 'src/utils/funcs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(SessionEntity)
    private sessionReposity: Repository<SessionEntity>,

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

  async generateToken(payload: GeneratePayloadDto): Promise<GeneratedTokenDto> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_SECRET,
        expiresIn: process.env.ACCESS_EXPIRED,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: process.env.REFRESH_EXPIRED,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async login(user: UserEntity): Promise<HttpResponse<LoginResponseDto>> {
    const payload = { username: user.username, sub: user.id };

    const { access_token, refresh_token } = await this.generateToken(payload);

    await this.sessionReposity.insert({
      username: user.username,
      access_token,
      refresh_token,
    });

    return returnObjects({ access_token, refresh_token });
  }

  async profile(username: string): Promise<HttpResponse<ProfileDto>> {
    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    delete foundUser.password;

    return returnObjects(foundUser);
  }

  async logout(username: string): Promise<any> {
    const foundSessions = await this.sessionReposity.find({
      where: { username },
    });

    foundSessions.forEach(async (session) => {
      if (!session.logout_at) {
        await this.sessionReposity.update(session.id, {
          logout_at: new Date(),
        });
      }
    });

    return returnObjects({ message: 'Logout successfully!' });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const user = this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET,
      });
      const payload = { username: user.username, sub: user.id };

      const { access_token, refresh_token } = await this.generateToken(payload);

      await this.sessionReposity.insert({
        username: user.username,
        access_token,
        refresh_token,
      });

      return returnObjects({ access_token, refresh_token });
    } catch (error) {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}
