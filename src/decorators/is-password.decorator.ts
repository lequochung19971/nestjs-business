import { applyDecorators } from '@nestjs/common';
import { Matches, ValidationOptions } from 'class-validator';

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export function IsPassword(
  options = {} as ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    Matches(passwordRegEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
      ...options,
    }),
  );
}
