import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServiceGateway } from 'src/gateway/service.gateway';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles-auth.guard';
import { LoginValidationMiddleware } from './middleware/validation.middleware';
import { JwtStrategy } from './strategies/jwt.strategies';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3000ms' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy, 
    RolesGuard, 
    ServiceGateway
  ],
  exports: []
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login')
  }
}
