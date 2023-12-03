import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AttendanceService {
  constructor(private readonly prismaService: PrismaService) {}
  async markAttendance(data: any) {
    const new_attendance = this.prismaService.attendance.create({
      data: {
        id: uuidv4(),
        leader_emp_id: data.leader_emp_id,
        member_name: data.member_name,
        member_emp_id: data.member_emp_id,
        date: data.date,
        time: data.time,
        location: data.location,
        contract_type: data.contract_type,
        tool_box_no: data.tool_box_no,
        topic: data.topic,
        signature: data.signature,
        type: data.type,
      },
    });
    return new_attendance;
  }

  async findByLeaderEmpId(data: any) {
    const result = await this.prismaService.attendance.findFirst({
      where: {
        leader_emp_id: data.leader_emp_id,
      },
    });
    return result;
  }

  async findAttendanceById(data: any) {
    const result = await this.prismaService.attendance.findUnique({
      where: {
        id: data.id,
      },
    });
    return result;
  }

  async findAllAttendance(data: any) {
    const all_attendance = await this.prismaService.attendance.findMany({
      where: {
        leader_emp_id: data.leader_emp_id,
        tool_box_no: data.tool_box_no,
        date: data.date,
      },
    });

    return all_attendance;
  }
}
