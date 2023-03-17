import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { access } from 'fs';
import path from 'path';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin(@Req() req: Request, @Res() res: Response) {
    const { hipspot_refresh_token } = req.cookies;
    if (hipspot_refresh_token) {
      return res.redirect('/auth/token');
    }
    return { msg: 'google', user: req.user };
  }

  //api/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(
    @Req()
    req: Request extends { user: UserDto } ? never : { user: UserDto },
    @Res() res: Response,
  ) {
    if (!req.user) return res.redirect('/auth/google/login');
    const accessToken: string = this.authService.accessTokenInssuance(
      req.user.userId,
    );

    const { refresh_token }: { refresh_token: string } =
      await this.authService.refreshTokenInssuance(req.user.userId);

    res.cookie('hipspot_refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: true,
    });

    return res.redirect(
      `http://localhost:3000/auth?access_token=${accessToken}`,
    );
  }

  @Get('/token')
  async reissue(@Req() req: Request, @Res() res: Response) {
    const { hipspot_refresh_token } = req.cookies;

    if (hipspot_refresh_token) {
      const { userId, crypto } = this.jwtService.decode(
        hipspot_refresh_token,
      ) as { userId: string; crypto: string };

      if (await this.authService.refreshTokenCryptovValidate(userId, crypto)) {
        const accessToken = this.authService.accessTokenInssuance(userId);
        console.log('리프레시 토큰에서 엑세스토큰 발급', accessToken);

        throw new HttpException(
          `http://localhost:3000/auth?access_token=${accessToken}`,
          HttpStatus.MOVED_PERMANENTLY,
        );
      }
    }
    const status = req.app.get('status');
    const path = req.app.get('path');
    try {
      const { userId, crypto } = this.jwtService.decode(
        hipspot_refresh_token,
      ) as { userId: string; crypto: string };
      await this.authService.refreshTokenCryptovValidate(userId, crypto);
      const accessToken = this.authService.accessTokenInssuance(userId);

      console.log('엑세스토큰 발급');

      return res.redirect(
        `http://localhost:3000/auth?access_token=${accessToken}`,
      );
    } catch (error) {
      throw new HttpException(
        '리프레시 토큰 인증 불가',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
