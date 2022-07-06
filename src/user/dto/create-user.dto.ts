import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Digite um nome de usuário valido' })
    name: string;

    @IsEmail({}, { message: 'Digite um e-mail valido' })
    email: string;

    @IsString()
    @Matches(/((?=.*\d)|(?=.*\d+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).$/, {
        message: 'a senha não é forte o bastante!',
    })
    password: string;
    rule: string;
}
