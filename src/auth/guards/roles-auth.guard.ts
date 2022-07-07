import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthRequest } from '../models/auth.request';
import { JwtPayload } from '../models/jwt.decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest()
    const jwtToken = request.headers.authorization

    const decode = jwtToken.split('.')[1]
    const decodeBuffer = Buffer.from(decode, 'base64')
    const role = JSON.parse(decodeBuffer.toString()) as JwtPayload

    console.log(role.user.rules)

    if(role.user.rules === 'admin') {
      return true; 

    } else {
      throw new UnauthorizedException('Esta requisição só poderá ser feita por um usuário administrativo');
    }
  } 
}