import { SetMetadata } from '@nestjs/common';

export const IS_BYPASS_CSRF_KEY = Symbol('IS_PUBLIC_ROUTE_KEY');
export const IsBypassCsrf = () => SetMetadata(IS_BYPASS_CSRF_KEY, true);
