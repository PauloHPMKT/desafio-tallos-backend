import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Digite um nome de usuário valido' })
    name: string;

    @IsEmail({}, { message: 'Digite um e-mail valido' })
    email: string;

    /*@Matches(/((?=.*\d)|(?=.*\d+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).$/, {
        message: 'a senha não é forte o bastante!',
    })*/
    @IsString()
    @Expose()
    password: string;
    rule: string;
}
