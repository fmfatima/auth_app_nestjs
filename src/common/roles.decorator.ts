import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles'; // set multiple role key

//decorator named Roles: setMetaData use to set multiple value into your decorator
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); //using SetMetadata: inject role into key value pair 
