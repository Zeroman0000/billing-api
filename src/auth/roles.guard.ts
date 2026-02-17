import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";
import { ROLES } from "src/common/roles.enum";

@Injectable()

export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        const hasRole = user.roles?.some((role: ROLES) =>
            requiredRoles.includes(role)
        )
        if (!hasRole) {
            throw new ForbiddenException('Access Denied');
        }
        return true;
    }
}