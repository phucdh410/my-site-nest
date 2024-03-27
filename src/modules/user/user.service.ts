import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async createUser(username: string, password: string): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      username,
      password,
    });
    return this.userRepository.save(newUser);
  }
}
