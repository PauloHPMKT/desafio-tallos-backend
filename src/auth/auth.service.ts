import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    // realizar login
    login() {
        throw new Error('Method not implemented.');
    }

    //validar usuario
    validateUser(email: string, password: string): any {
      throw new Error('Method not implemented.');
    }
}
