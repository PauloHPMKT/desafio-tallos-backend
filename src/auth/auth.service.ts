import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encript } from 'src/helpers/crypto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserToken } from './models/user.token';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  //validar usuario
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
  
    if(user) {
      const compareValidPassword = await Encript.ComparePass(password, user.password)
  
      if(compareValidPassword) {
        user.password = undefined

        return { 
          user,
        }
      }
    }
    throw new Error('Email ou senhas incorretos!')
  }

  // realizar login
  login(user: User): UserToken {
    //gerar token
    const jwtToken = this.jwtService.sign(user)
    
    return {
      access_token: jwtToken,
      ...user,  
    }
  }

}
