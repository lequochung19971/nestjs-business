import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FileRepository } from './file.repository';

@Module({
  controllers: [FilesController],
  providers: [FilesService, FileRepository, ConfigService],
})
export class FilesModule {}
