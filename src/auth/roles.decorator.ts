import { SetMetadata } from "@nestjs/common";
import { ROLES } from "src/common/roles.enum";

export const ROLES_KEY='roles';
export const Role=(...roles:ROLES[])=>SetMetadata(ROLES_KEY,roles)