import { Injectable, CanActivate, ExecutionContext,UnauthorizedException } from '@nestjs/common';
import {Reflector} from '@nestjs/core'

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector:Reflector){}
    canActivate(context:ExecutionContext):boolean{
        const allowedRoles=this.reflector.get<string []>('allowedRoles',context.getHandler())
        const request=context.switchToHttp().getRequest();
        const result=request.user.roles.map((role:string)=>allowedRoles.includes(role)).find((val:boolean)=>val==true)
        if(result) return true;
        throw new UnauthorizedException("sorry you are not authorized")






    }
}