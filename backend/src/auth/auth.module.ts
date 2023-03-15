import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google-strategy';
import { JwtStrategy } from './strategy/jwt-strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule,
  ],
  providers: [
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    GoogleStrategy,
    SessionSerializer,
    JwtStrategy,
    JwtService,
    UserRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
