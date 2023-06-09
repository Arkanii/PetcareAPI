import { Observable } from 'rxjs';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import UserEntity from './entities/user.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = new UserEntity(request.user);

    const hasRole = () =>
      !!user.roles.find((role) => !!roles.find((item) => item === role));

    if (!user || !user.roles || !hasRole()) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
