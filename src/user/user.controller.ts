import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //cria usuarios
  @IsPublic()
  @Post('register')
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  //lista usuarios
  @IsPublic()
  @Get('listusers')
  findAll() {
    return this.userService.findAll();
  }

  //list one user
  @IsPublic()
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
  
  //update user
  @IsPublic()
  @UseGuards(RolesGuard)
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(email, updateUser);
  }

  //delete user
  @IsPublic()
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
