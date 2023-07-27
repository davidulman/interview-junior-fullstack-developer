import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/city')
  getCity(
    @Body('cityName') cityName: string,
    @Body('currentPage') currentPage: number,
  ) {
    return this.appService.getCity(cityName, currentPage);
  }
}
