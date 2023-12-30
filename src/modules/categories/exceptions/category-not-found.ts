import { NotFoundException } from '@nestjs/common';

export class CategoryNotFound extends NotFoundException {
  constructor() {
    super('category.not-found');
  }
}
