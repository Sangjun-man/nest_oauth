import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(options) {
    await this.userRepository.findOne(options);
  }

  async tokenRegister(userId: string, refresh_token_iv: string) {
    console.log('register', userId, refresh_token_iv);
    console.log(
      await this.userRepository.findOneAndUpdate(userId, {
        refresh_token_iv,
      }),
    );
  }
}
