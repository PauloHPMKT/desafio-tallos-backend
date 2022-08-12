import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Encript } from '../helpers/crypto';
import { ServiceGateway } from 'src/gateway/service.gateway';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('usuarios') private readonly userModel: Model<CreateUserDto>,
    private readonly serviceGateway: ServiceGateway,
  ) {}

  //criando novo usuario
  async create(createNewUser: CreateUserDto) {
    const userFound = await this.userModel.findOne({
      email: createNewUser.email,
    });

    if (userFound) {
      throw new Error('Usuario já existe');
    }

    const newUser = await new this.userModel(createNewUser);
    newUser.password = await Encript.CriptoPass(newUser.password);

    return newUser.save();
  }

  //listando todos os usuarios
  async findAll() {
    return await this.userModel.find();
  }

  //identificando usuario por email
  async findByEmail(email: string) {
    const userLogin = await this.userModel.findOne({ email });

    return userLogin;
  }

  //listar um usuario
  findByFilter(email: string) {
    return this.userModel.find({ email });
  }

  //update user
  update(id: string, updateUser: UpdateUserDto) {
    return this.userModel.updateOne(
      { _id: id },
      { $set: updateUser },
      { new: true },
    );
  }

  //delete user
  remove(id: string) {
    this.serviceGateway.emitRemoveUserEvent(id);
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
