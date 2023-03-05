import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guard/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  user(@Req() request: Request) {
    console.log(request.user);

    if (request.user) {
      return { msg: 'Authenticated', data: request.user };
    } else {
      return { msg: 'notAuth' };
    }
  }
}
