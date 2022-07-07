import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encript } from 'src/helpers/user.crypto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserPayload } from './models/user.payload';
import { UserToken } from './models/user.token';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  //validar usuario
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
  
    if(user) {
      const compareValidPassword = user.password = await Encript.ComparePass(password, user.password)
  
      if(compareValidPassword) {
        return ({ user })
      }
    }
    throw new Error('Email ou senhas incorretos!')
  }

  // realizar login
  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id, 
      name: user.name,
      email: user.email,
      rules: user.rules,
    }

    //gerar token
    const jwtToken = this.jwtService.sign(user)
    
    return {
      access_token: jwtToken,
      ...user,  
    }
  }

}
