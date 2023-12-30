import { IsBoolean, IsOptional, NotEquals } from 'class-validator';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ToBoolean } from '../transform.decorator';
import { BaseFieldOption } from './base-field-option.interface';

interface IBooleanFieldOptions extends BaseFieldOption {}

export function BooleanField(
  options: Omit<ApiPropertyOptions, 'type'> & IBooleanFieldOptions = {},
): PropertyDecorator {
  const decorators = [ToBoolean(), IsBoolean()];

  if (options.optional) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
