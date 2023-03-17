import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guard/jwt-guard';
import { LoggingInterceptor } from './global/interceptor/logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@Req() req: Request): string {
    console.log(req.cookies);
    return this.appService.getHello();
  }
  @Get('test')
  test(@Req() req: Request): string {
    return this.appService.getHello();
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  user(@Req() request: Request) {
    return { msg: 'Authenticated', data: request.user };
  }
}
