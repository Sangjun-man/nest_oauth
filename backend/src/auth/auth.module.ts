import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/googleStrategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [UserModule],
  providers: [
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    GoogleStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
