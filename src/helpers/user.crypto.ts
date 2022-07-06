import * as bcrypt from 'bcrypt'

export class Encript {
    static async CriptoPass(pass: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(pass, salt)
    }
}