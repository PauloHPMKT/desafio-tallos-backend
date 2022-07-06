import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user-database'),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
