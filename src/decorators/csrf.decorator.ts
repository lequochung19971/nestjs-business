import { UseGuards, applyDecorators } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CsrfGuard } from 'src/guards/csrf.guard';

export function Csrf(message?: string) {
  return applyDecorators(UseGuards(new CsrfGuard(message, new Reflector())));
}
