import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: 'http://localhost:5001/auth/google/redirect',
      scope: ['profile', 'email', 'openid'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('validate', accessToken, refreshToken, profile);
  }
}
