import { Test, TestingModule } from '@nestjs/testing';
import { FileExportController } from './file-export.controller';

describe('FileExportController', () => {
  let controller: FileExportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileExportController],
    }).compile();

    controller = module.get<FileExportController>(FileExportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
