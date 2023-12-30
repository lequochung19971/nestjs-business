import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  getCsrfFromRequest,
  getSecretFromRequest,
  verifyCsrf,
} from 'src/common/csrf';
import { IS_BYPASS_CSRF_KEY } from 'src/decorators/is-bypass-csrf.decorator';
import { CsrfInvalidException } from 'src/exceptions/csrf-invalid.exception';
import { CsrfNotFoundException } from 'src/exceptions/csrf-not-found.exception';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(
    private readonly message?: string,
    private readonly reflector?: Reflector,
  ) {
    this.message = message || 'Invalid CSRF Token';
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isByPass = this.reflector.getAllAndOverride<boolean>(
      IS_BYPASS_CSRF_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isByPass || request.ignoreCsrf) {
      return true;
    }

    const secret = getSecretFromRequest(request);
    const token = getCsrfFromRequest(request);
    if (!secret || !token) {
      throw new CsrfNotFoundException(this.message);
    }
    if (!verifyCsrf(secret, token)) {
      throw new CsrfInvalidException(this.message);
    }

    return true;
  }
}
