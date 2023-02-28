import { Injectable } from '@nestjs/common';
import { UserType } from 'src/user/dto/user.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async validateUser(userDetails: Omit<UserType, 'userId'>) {
    console.log('authService', userDetails);
    const { email } = userDetails;
    const user = await this.userRepository.findOne({ email });
    console.log('finded user', user);
    if (user) return user;

    console.log('registrate new User');
    return await this.userRepository.insertOne(userDetails);
  }

  async findUser(userId: string) {
    return await this.userRepository.findOne({ userId });
  }
}
