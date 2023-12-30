import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, NotEquals } from 'class-validator';
import { BaseFieldOption } from './base-field-option.interface';

interface IFieldOptions extends BaseFieldOption {}

export function DateField(
  options: Omit<ApiPropertyOptions, 'type'> & IFieldOptions = {},
): PropertyDecorator {
  const decorators = [Type(() => Date), IsDate()];

  if (options.optional) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
