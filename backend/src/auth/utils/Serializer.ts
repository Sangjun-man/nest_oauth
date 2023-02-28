import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from '../auth.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  // 세션에 user 추가
  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    console.log('serializeUser', user);
    done(null, user);
  }

  // 세션에 로그인 되어있는 user 체크
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    const userId = payload.userId as string;
    const user = await this.authService.findUser(userId);
    console.log('deserializing user', user);

    return user ? done(null, user) : done(null, null);
  }
}
