import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ServiceGateway } from 'src/gateway/service.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'usuarios', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, ServiceGateway],
  exports: [UserService],
})
export class UserModule {}
