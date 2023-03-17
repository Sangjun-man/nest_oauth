import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto, UserType } from 'src/user/dto/user.dto';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import * as cipherUtils from './utils/cipher';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
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

  accessTokenInssuance(userId: string) {
    return this.jwtService.sign(
      { userId },
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '30m' },
    );
  }

  /**
   * 리프레시토큰 발급 및 db 갱신
   */
  async refreshTokenInssuance(userId: string) {
    const iv = cipherUtils.getRandomIv(); // iv값으로 결국 암호화 및 복호화
    console.log('refresh 랜덤 발급', iv.toString('hex'));
    const crypto = await cipherUtils.cryptoUTFToBase64(iv, userId);

    const refresh_token = this.jwtService.sign(
      {
        userId,
        crypto,
      },
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '30 days' },
    );

    await this.userService.tokenRegister(userId, iv.toString('hex'));

    return {
      refresh_token,
    };
  }

  /**
   *
   * @param userId user Id
   * @param cryptedUserId refresh 토큰에 암호화된
   * @returns
   */
  async refreshTokenCryptovValidate(userId: string, cryptedUserId: string) {
    const ivString = (await this.userRepository.findOne({ userId }))
      .refresh_token_iv;

    console.log('validate, ivstring', ivString, userId, cryptedUserId);

    const decryptedUserId = await cipherUtils.decryptoBase64ToUTF(
      ivString,
      cryptedUserId,
    );

    console.log('복호화 후 체크', userId, decryptedUserId);

    return userId === decryptedUserId;
  }
}
