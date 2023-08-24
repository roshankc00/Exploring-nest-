import { NestMiddleware, Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

interface jwtPayload {
  id: string;
}

 export interface UserRequest extends  Request {
    user?:UserEntity;
} 

@Injectable()
export class currentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer')
    ) {
      req.user=null;
      next();
    } else {
        try {
            
     
      const token = authHeader.split(' ')[1];
      const { id } = <jwtPayload>verify(token, process.env.SECRET);
      const currentUser = await this.userService.findOne(+id);
      req.user=currentUser;
      next();
    } catch (error) {
        req.user=null;
        next()           
    }
    }
  }
}
