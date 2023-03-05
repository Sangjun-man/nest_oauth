import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    console.log(context, 'jwt- validating');
    return super.canActivate(context) as boolean;
  }
}
