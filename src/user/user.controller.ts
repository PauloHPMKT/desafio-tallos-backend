import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ServiceGateway } from '../gateway/service.gateway';
//import { RolesGuard } from 'src/auth/guards/roles-auth.guard';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly serviceGateway: ServiceGateway,
  ) {}

  //cria usuarios
  @Post('register')
  @IsPublic()
  create(@Body() createUser: CreateUserDto) {
    this.serviceGateway.emitingCreateUserEvent();
    return this.userService.create(createUser);
  }

  //lista usuarios
  @Get('listusers')
  @IsPublic()
  findAll() {
    return this.userService.findAll();
  }

  //list one user
  @Get('finduser/:email')
  @IsPublic()
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  //search user
  @Get('search/:email')
  @IsPublic()
  search(@Param('email') email: string) {
    return this.userService.findByFilter(email);
  }

  //update user
  //@UseGuards(RolesGuard)
  @Patch('update/:id')
  @IsPublic()
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    this.serviceGateway.emitUpdateUserEvent(id);
    return this.userService.update(id, updateUser);
  }

  //delete user
  @Delete('remove/:email')
  @IsPublic()
  remove(@Param('email') email: string) {
    this.serviceGateway.emitRemoveUserEvent(email);
    return this.userService.remove(email);
  }
}
