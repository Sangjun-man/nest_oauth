import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  handleLogin() {
    return { msg: 'google auth' };
  }

  //api/google/redirect
  @Get('google/redirect')
  handleRedirect() {
    return { msg: 'google redirect' };
  }
}
