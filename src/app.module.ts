import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AttendanceModule } from './attendance/attendance.module';
import { FileExportModule } from './file-export/file-export.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [AuthenticationModule, PrismaModule, AttendanceModule, FileExportModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
