import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/mark-attendance')
  markAttendance(@Body() data: any) {
    return this.attendanceService.markAttendance(data);
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
}
