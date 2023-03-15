import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
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
    return { msg: 'google', user: req.user };
  }

  //api/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req, @Res() res) {
    console.log(req.user);
    const Token: string = this.authService.jwtIssuance(req.user);
    return res.redirect(`http://localhost:3000/auth/redirect/${Token}`);
  }
}
