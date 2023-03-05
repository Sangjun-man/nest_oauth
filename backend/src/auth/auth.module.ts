import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google-strategy';
import { JwtStrategy } from './strategy/jwt-strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [UserModule],
  providers: [
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    GoogleStrategy,
    SessionSerializer,
    JwtStrategy,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
