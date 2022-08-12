import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ChatModule } from './gateway/chat/chat.module';
import { ServiceGateway } from './gateway/service.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/user-database?authSource=admin'),
    UserModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ServiceGateway,
  ],
})
export class AppModule {}
