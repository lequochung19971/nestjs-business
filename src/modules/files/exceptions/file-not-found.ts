import { NotFoundException } from '@nestjs/common';

export class FileNotFound extends NotFoundException {
  constructor() {
    super('file.not-found');
  }
}
