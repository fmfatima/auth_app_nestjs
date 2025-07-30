import { Injectable, CanActivate, ExecutionContext,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Roles } from './roles.enums'; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} //get/fetch Metadata values

  canActivate(context: ExecutionContext): boolean { //execyte every time
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles required
    }

    const request = context.switchToHttp().getRequest<{ headers: Record<string, string>}>();
    const userRole = request.headers['x-user-role'] as Roles;
    return requiredRoles.includes(userRole);
  }
}
