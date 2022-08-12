/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @ApiProperty({
    description: 'O nome é utilizado para identificar o usuário com acesso ao sistema',
    example: 'Qualquer texto digitável - (Paulo Sérgio, paulo sergio)',
  })
  @IsNotEmpty({ message: 'Digite um nome de usuário valido' })
  name: string;

  @ApiProperty({
    description: 'O email é utilizado para identificar um usuário com acesso ao sistema e para campos de buscas',
    example: 'teste@email.com',
  })
  @IsEmail({}, { message: 'Digite um e-mail valido' })
  email: string;

  @ApiProperty({
    description: 'A senha autentica um usuário cadastrado a ter acesso ao sistema',
    example: 'tipos strings de texto 123456assdfsdfsc¨&/$%-%"!@',
  })
  @IsString()
  @Expose()
  password: string;
  rules: string;
}
