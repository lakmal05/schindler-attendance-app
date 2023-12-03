import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authentication: AuthenticationService) {}

  @Post('login')
  async login(@Body() data: any) {
  
    
    const reponse = await this.authentication.login(data);
    return reponse;
  }
}
