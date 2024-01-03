import { Injectable } from '@nestjs/common';
import { VercelBlobService } from 'src/shared/services/vercel-blob.service';
import * as sharp from 'sharp';
import { v4 } from 'uuid';
import { toQueryResponseDto } from 'src/utils/toDtoArray';
import { FileRepository } from './file.repository';
import { FileNotFound } from './exceptions/file-not-found';
import { FileDto } from './dto/file.dto';
import { FileQueryParamsDto } from './dto/file-query-params.dto';
import { MimeTypes } from './enums/mine-types.enum';
import { FileExtension } from './enums/file-extension.enum';

@Injectable()
export class FilesService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly vercelBlobService: VercelBlobService,
  ) {}

  static get defaultFormat() {
    return /^image\/(jpeg|png|gif|bmp|webp|svg\+xml)$/g;
  }

  static get defaultMaxFileSize() {
    return 10000000; // 10 mb
  }

  async uploadFile(file: Express.Multer.File) {
    const webpFile = await this.convertToWebp(file);

    const uuid = v4();
    const blobResult = await this.vercelBlobService.put(
      this.generateUniqueFileUrl(webpFile.name, uuid),
      webpFile.buffer,
      {
        access: 'public',
      },
    );

    const fileEntity = this.fileRepository.create({
      id: uuid,
      name: webpFile.name,
      extension: webpFile.extension,
      mimeType: webpFile.mimeType,
      path: blobResult.url,
      size: webpFile.size,
    });

    return this.fileRepository.save(fileEntity);
  }

  async getFiles(queryParams: FileQueryParamsDto) {
    let queryBuilder = this.fileRepository.createQueryBuilder('file');

    let totalCount: number;
    if (queryParams.includeTotalCount) {
      totalCount = await queryBuilder.getCount();
    }

    if (queryParams.search?.columns?.length && queryParams.search?.value) {
      queryBuilder = queryBuilder.search(
        queryParams.search.columns,
        queryParams.search.value,
      );
    }

    const users = await queryBuilder

      .orderBy(queryParams.orderColumn, queryParams.order)
      .take(queryParams.take)
      .skip(queryParams.skip)
      .getMany();
    return toQueryResponseDto(FileDto, {
      entity: users,
      meta: {
        page: queryParams.page,
        take: queryParams.take,
        totalCount,
      },
    });
  }

  async deleteFile(id: string) {
    const fileEntity = await this.fileRepository.findOneBy({ id });
    if (!fileEntity) throw new FileNotFound();

    await this.fileRepository.delete(id);

    const url = this.generateUniqueFileUrl(
      fileEntity.name.replace(`.${fileEntity.extension}`, ''),
      fileEntity.id,
    );

    await this.vercelBlobService.delete(url);
  }

  private generateUniqueFileUrl(fileName: string, uuid: string) {
    return `${uuid}-${fileName}`;
  }

  private async convertToWebp(file: Express.Multer.File) {
    const fileExtension = this.getFileExtension(file.originalname);

    const webpFileName = file.originalname.replace(
      `.${fileExtension}`,
      `.webp`,
    );

    const webp = sharp(file.buffer).webp({
      quality: 20,
      lossless: true,
      loop: 0,
    });
    const webpFile = await webp.toFile(webpFileName);
    const webpFileBuffer = await webp.toBuffer();
    return {
      name: webpFileName,
      buffer: webpFileBuffer,
      size: webpFile.size,
      extension: 'webp' as FileExtension,
      mimeType: 'image/webp' as MimeTypes,
    };
  }

  private getFileExtension(fileName: string) {
    const parts = fileName.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }

    return '';
  }
}
