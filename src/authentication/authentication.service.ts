import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(data: any) {
    const is_exsist = await this.prismaService.user.findUnique({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    if (!is_exsist) {
      return false;
    } else {
      return true;
    }
  }
  async logout(data: any) {}
}
