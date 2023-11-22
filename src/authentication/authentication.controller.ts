import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authentication: AuthenticationService) {}

  @Get('login')
  async login(@Body() data: any) {
    console.log(data,"data");
    
    return await this.authentication.login(data);
  }
}
