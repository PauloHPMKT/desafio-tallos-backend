import * as bcryptjs from 'bcryptjs';

export class Encript {
  static async CriptoPass(pass: string) {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(pass, salt);
  }

  static async ComparePass(enterPass: string, userPass: string) {
    return await bcryptjs.compare(enterPass, userPass);
  }
}
