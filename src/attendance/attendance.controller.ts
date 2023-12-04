import { Body, Controller, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/mark-attendance')
  markAttendance(@Body() data: any) {
    return this.attendanceService.markAttendance(data);
  }
}
