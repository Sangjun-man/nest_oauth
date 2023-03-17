import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JWTException } from 'src/global/exception/jwtException.exception';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const { authorization } = request.headers;
    const { hipspot_refresh_token } = request.cookies;

    console.log('jwt guard,', authorization, hipspot_refresh_token);

    if (!(authorization || hipspot_refresh_token)) {
      throw new HttpException('토큰 둘다 없음', HttpStatus.UNAUTHORIZED);
    }
    const activate = (await super.canActivate(context)) as boolean;
    return activate;
  }
  handleRequest(
    err: Error, // strategy validate에서 에러가 터지면 여기로 온다.
    user: any,
    info: Error, //jwtStrategy에서 에러가 터지면 여기로 온다
    context: ExecutionContext,
    status?: any,
  ) {
    const response = context.switchToHttp().getResponse() as Response;
    if (err) throw err;
    if (info) {
      let status = '';
      if (info.message === 'No auth token') status = 'NO_AUTH_TOKEN';
      if (info.message === 'jwt expired') status = 'JWT_EXPIRED';

      throw new JWTException(info.message, status);
    } else {
      return user;
    }
  }
}
