import { Transform } from 'class-transformer';
import { castArray, isNil } from 'lodash';

/**
 * @desc transforms to array, specially for query params
 */
export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const { value } = params;

      if (isNil(value)) {
        return [];
      }

      return castArray(value);
    },
    { toClassOnly: true },
  );
}

/**
 * @desc trim spaces from start and end, replace multiple spaces with one.
 * @returns PropertyDecorator
 */
export function Trim(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value as string[] | string;

    if (Array.isArray(value)) {
      return value.map((v) => v.trim().replaceAll(/\s\s+/g, ' '));
    }

    return value.trim().replaceAll(/\s\s+/g, ' ');
  });
}

export function ToBoolean(): PropertyDecorator {
  return Transform(
    (params) => {
      switch (params.value) {
        case 'true': {
          return true;
        }

        case 'false': {
          return false;
        }

        default: {
          return params.value;
        }
      }
    },
    { toClassOnly: true },
  );
}

/**
 * @desc convert string or number to integer
 * @returns PropertyDecorator
 */
export function ToInt(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string;

      return Number.parseInt(value, 10);
    },
    { toClassOnly: true },
  );
}

export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params): string | string[] => {
      const value = params.value as string | string[];

      if (!value) {
        return value;
      }

      if (Array.isArray(value)) {
        return value.map((v) => v.toLowerCase());
      }

      return value.toLowerCase();
    },
    {
      toClassOnly: true,
    },
  );
}

export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params): string | string[] => {
      const value = params.value as string | string[];

      if (!value) {
        return value;
      }

      if (Array.isArray(value)) {
        return value.map((v) => v.toUpperCase());
      }
      return value.toUpperCase();
    },
    {
      toClassOnly: true,
    },
  );
}
