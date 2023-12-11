import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AttendanceService {
  constructor(private readonly prismaService: PrismaService) {}
  async markAttendance(data: any) {
    console.log(data.execute_date, 'date');
    console.log(new Date(data.execute_date), 'time');

    try {
      const new_attendance = this.prismaService.attendance.create({
        data: {
          id: uuidv4(),
          leader_emp_id: data.leader_emp_id,
          member_name: data.member_name,
          member_emp_id: data.member_emp_id,
          // leader_attendance_id:data.leader_attendance_id
          execute_date: new Date(data.execute_date),
          execute_time: data.execute_time,
          location: data.location,
          contract_type: data.contract_type,
          tool_box_no: data.tool_box_no,
          topic: data.topic,
          signature: data.signature,
          type: data.type,
        },
      });
      return new_attendance;
    } catch (error) {
      console.log(error);
    }
  }

  async findByLeaderEmpId(data: any) {
    const result = await this.prismaService.attendance.findFirst({
      where: {
        leader_emp_id: data.leader_emp_id,
      },
    });
    return result;
  }

  async findAttendanceByAttendanceId(id: any) {
    const result = await this.prismaService.attendance.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }

  async findAllMembersAttendance(data: any) {
    console.log('all memeber attendance ==============');

    const all_member_attendance = await this.prismaService.attendance.findMany({
      where: {
        // leader: {
        //   attendance: {
        //     some: {
        //       id: '',
        //     },
        //   },
        // },
        leader_emp_id: data.leader_emp_id,
        tool_box_no: data.tool_box_no,
        execute_date: data.execute_date,
        type: 'MEMBER',
      },
    });

    return all_member_attendance;
  }

  async updateAttendance(data: any) {
    try {
      const update = await this.prismaService.attendance.update({
        where: {
          id: data.id,
        },
        data: {
          tool_box_no: data.tool_box_no,
          execute_time: data.execute_time,
          execute_date: data.execute_date,
          location: data.location,
          topic: data.topic,
          member_name: data.member_name,
          member_emp_id: data.member_emp_id,
          contract_type: data.contract_type,
          signature: data.signature,
        },
      });
      return update;
    } catch (error) {
      return error;
    }
  }

  async updateAllAttendance(data: any) {
    //  try {
    //   const update= await this.prismaService.attendance.updateMany({
    //     where:{
    //       leader_attendance_id:data.leader_attendance_id,
    //     }data:{
    // execute_date: data.execute_date,
    //tool_box_no: data.tool_box_no,
    // }
    //   })
    //  } catch (error) {
    //  }
  }

  async findAllAttendance(data: any) {
    console.log('alll attendance ===================');

    const all_attendance = await this.prismaService.attendance.findMany({
      where: {
        // leader: {
        //   attendance: {
        //     some: {
        //       id: '',
        //     },
        //   },
        // },
        leader_emp_id: data.leader_emp_id,
        tool_box_no: data.tool_box_no,
        execute_date: data.execute_date,
      },
    });

    return all_attendance;
  }
}
