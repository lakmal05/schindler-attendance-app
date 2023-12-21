import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('get-leader-attendance/:attendance_id')
  findAttendanceByAttendanceId(@Param('attendance_id') attendance_id: string) {
    return this.attendanceService.findAttendanceByAttendanceId(attendance_id);
  }

  @Post('/mark-attendance')
  markAttendance(@Body() data: any) {
    return this.attendanceService.markAttendance(data);
  }

  @Get('all-member-attendance/:leader_emp_id')
  findAllMemberAttendance(
    @Param('leader_emp_id') leader_emp_id: string,
    @Query('execute_date') execute_date: any,
    @Query('tool_box_no') tool_box_no: string,
  ) {
    const data = {
      leader_emp_id,
      execute_date,
      tool_box_no,
    };
    console.log(data, 'dsfasdfasdfasdf');

    return this.attendanceService.findAllMembersAttendance(data);
  }

  @Get('all-attendance/:leader_emp_id')
  findAllAttendance(
    @Param('leader_emp_id') leader_emp_id: string,
    @Query('execute_date') execute_date: any,
    @Query('tool_box_no') tool_box_no: string,
  ) {
    const data = {
      leader_emp_id,
      execute_date,
      tool_box_no,
    };

    return this.attendanceService.findAllAttendance(data);
  }

  
  @Put('update-teamMember')
  updateTeamMemberAttendance(@Body() data: any) {
    console.log(data, 'data');
    return this.attendanceService.updateTeamMemberAttendance(data);
  }

  @Put('update-all-attendance')
  async updateAllAttendance(@Body() data: any) {
    return await this.attendanceService.updateAllAttendance(data);
  }
}
