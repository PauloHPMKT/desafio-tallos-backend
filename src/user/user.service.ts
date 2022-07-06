import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Encript } from 'src/helpers/user.crypto';

@Injectable()
export class UserService {

  constructor(@InjectModel('usuarios') private readonly userModel: Model<CreateUserDto>) {}

  //criando novo usuario
  async create(createNewUser: CreateUserDto) {
    const newUser = await new this.userModel(createNewUser);
    newUser.password = await Encript.CriptoPass(newUser.password)
    
    return newUser.save()
  }

  //listando todos os usuarios
  async findAll() {
    return await this.userModel.find();
  }

  //identificando usuario por email
  findByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
