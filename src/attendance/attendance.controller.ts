import { Body, Controller, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/mark-attendance')
  markAttendance(@Body() data: any) {
    console.log(data, 'data log');
    return true;

    // return this.attendanceService.markAttendance(data);
  }
}
