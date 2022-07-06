import { Injectable } from '@nestjs/common';
import { Encript } from 'src/helpers/user.crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    // realizar login
    login() {
        throw new Error('Method not implemented.');
    }

    //validar usuario
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        if(user) {
            const validPassword = user.password = await Encript.ComparePass(password, user.password)

            if(validPassword) {
                return user
            }
        }
        throw new Error('Email ou senhas incorretos!')
    }
}
