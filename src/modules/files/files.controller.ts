import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Csrf } from 'src/decorators/csrf.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FileQueryParamsDto } from './dto/file-query-params.dto';

@Controller('files')
@ApiTags('files')
// @UseGuards(JwtGuard)
// @Csrf()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    summary: 'Update file',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: FilesService.defaultMaxFileSize,
          }),
          new FileTypeValidator({
            fileType: FilesService.defaultFormat,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }

  @ApiOperation({
    summary: 'Query files',
  })
  @Get()
  findAll(@Query() queryParams: FileQueryParamsDto) {
    return this.filesService.getFiles(queryParams);
  }

  @ApiOperation({
    summary: 'Delete file by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.deleteFile(id);
  }
}
