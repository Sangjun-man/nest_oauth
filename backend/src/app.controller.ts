import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);

    if (request.user) {
      return { msg: 'Authenticated', data: request.user };
    } else {
      return { msg: 'notAuth' };
    }
  }
}
