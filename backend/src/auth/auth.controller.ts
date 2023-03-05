import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(@Req() req) {
    console.log(req.user);
    return { msg: 'google auth', user: req.user };
  }

  //api/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() req) {
    console.log(req.user);
    return { msg: 'google redirect', user: req.user };
  }

  @Get('test')
  login() {
    const payload = {
      uuid: '1234567890',
      name: '이상준',
      email: 'lsj96412@gmail.com',
      iat: 1516239022,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
