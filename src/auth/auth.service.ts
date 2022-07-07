import { Injectable } from '@nestjs/common';
import { Encript } from 'src/helpers/user.crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    // realizar login
    login() {
       return 'usuario logado';
    }

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
}
