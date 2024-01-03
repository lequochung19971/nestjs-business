import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutCommandOptions, del, put } from '@vercel/blob';
import { Readable } from 'stream';

@Injectable()
export class VercelBlobService {
  constructor(private readonly configService: ConfigService) {}

  get token() {
    return this.configService.get<string>('VERCEL_BLOB_READ_WRITE_TOKEN');
  }

  put(
    pathname: string,
    body:
      | string
      | Readable
      | Blob
      | ArrayBuffer
      | FormData
      | ReadableStream<any>
      | File,
    options = {} as PutCommandOptions,
  ) {
    return put(pathname, body, {
      ...options,
      token: this.token,
    });
  }

  delete(
    url: Parameters<typeof del>[0],
    options = {} as Parameters<typeof del>[1],
  ) {
    return del(url, {
      ...options,
      token: this.token,
    });
  }
}
