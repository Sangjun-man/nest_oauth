import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import e, { Request, Response } from 'express';
import { JWTException } from '../exception/jwtException.exception';

@Catch(JWTException)
export class JWTExceptionFilter implements ExceptionFilter {
  catch(exception: JWTException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>() as Request;
    request.app.set('path', request.path);
    request.app.set('status', exception.status);

    console.log('jwt exception', exception.message, exception.stack);
    response.redirect('/auth/token');
  }
}
