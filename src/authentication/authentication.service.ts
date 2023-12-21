import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(data: any) {
    const incoming_passowrd = data.password;
    const is_exsist = await this.prismaService.user.findUnique({
      where: {
        username: data.username,
      },
    });
    const password = is_exsist.password;
    if (!is_exsist) {
      return false;
    } else {
      if (is_exsist.password !== incoming_passowrd) {
        return false;
      } else {
        const employee = await this.prismaService.employee.findUnique({
          where: {
            id: is_exsist.employee_id,
          },
        });
        const token = await this.generateToken(employee.emp_id);

        const data = {
          id: employee.id,
          emp_id: employee.emp_id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          nic: employee.nic,
          type: employee.type,
          contact_no: employee.contact_no,
          created_at: employee.created_at,
          updated_at: employee.updated_at,
          token: token,
        };
        return data;
      }
    }
  }

  generateToken(username: string): string {
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = jwt.sign({ username }, secretKey);

    return token;
  }

  async logout(data: any) {}
}
