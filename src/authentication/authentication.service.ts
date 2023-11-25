import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

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
      const employee = await this.prismaService.employee.findUnique({
        where: {
          id: is_exsist.id,
        },
      });
      const token = await this.generateToken(employee.first_name);

      const data = {
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        nic: employee.nic,
        contact_no: employee.contact_no,
        created_at: employee.created_at,
        updated_at: employee.updated_at,
        token: token,
      };

      console.log(token);
    }
  }

  generateToken(username: string): string {
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = jwt.sign({ username }, secretKey);

    return token;
  }

  async logout(data: any) {}
}
