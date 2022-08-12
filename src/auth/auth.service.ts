import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceGateway } from 'src/gateway/service.gateway';
import { Encript } from '../helpers/crypto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserToken } from './models/user.token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly serviceGateway: ServiceGateway,
  ) {}

  //validar usuario
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const compareValidPassword = await Encript.ComparePass(
        password,
        user.password,
      );

      if (compareValidPassword) {
        user.password = undefined;

        return {
          user,
        };
      }
    }
    throw new Error('Email ou senhas incorretos!');
  }

  // realizar login
  login(user: User): UserToken {
    //gerar token
    const jwtToken = this.jwtService.sign(user);
    this.serviceGateway.emitUserLoginEvent(user);

    return {
      access_token: jwtToken,
      ...user,
    };
  }
}
