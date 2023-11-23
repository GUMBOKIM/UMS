import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ShareType } from '@share/api/ShareType';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const A: ShareType = {
      a: 'aa',
    };
    console.log(A);
    return this.appService.getHello();
  }
}
