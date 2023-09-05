import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../../users/entities/users.entity';
import { META_ROLES } from '../../decorators/role-protected/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
 const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())
 
 if(!validRoles) return true;

 if(validRoles.length === 0) return true;
 const req = context.switchToHttp().getRequest();
  const user = req.user as User;

  if(!user)
  throw new BadRequestException('user not fount')
  
for (const role of user.roles) {
  if(validRoles.includes(role)){
    return true
  }
}
  
   throw new Error("");
   
  }
}
