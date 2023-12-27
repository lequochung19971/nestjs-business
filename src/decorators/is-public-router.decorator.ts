import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE_KEY = Symbol('IS_PUBLIC_ROUTE_KEY');
export const IsPublicRouter = () => SetMetadata(IS_PUBLIC_ROUTE_KEY, true);
