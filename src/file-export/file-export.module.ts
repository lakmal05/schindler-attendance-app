import { Module } from '@nestjs/common';
import { FileExportService } from './file-export.service';
import { FileExportController } from './file-export.controller';

@Module({
  providers: [FileExportService],
  controllers: [FileExportController]
})



export class FileExportModule {}
