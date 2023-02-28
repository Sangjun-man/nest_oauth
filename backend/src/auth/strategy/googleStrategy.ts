import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { UserType } from 'src/user/dto/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: 'http://localhost:5001/auth/google/redirect',
      scope: ['profile', 'email', 'openid'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('validate', accessToken, refreshToken, profile);

    const { displayName, emails, photos } = profile;
    const userDetails: Omit<UserType, 'userId'> = {
      displayName,
      email: emails[0].value,
      image: photos[0].value,
    };
    await this.authService.validateUser(userDetails);
  }
}
