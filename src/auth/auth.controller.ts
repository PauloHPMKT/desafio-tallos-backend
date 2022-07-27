import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ServiceGateway } from 'src/gateway/service.gateway';
//import { ChatGateway } from 'src/gateway/chat/chat.gateway';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentuser.decorator';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth.request';

@Controller('api')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly serviceGateway: ServiceGateway,
        ) {}
    
    //login
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Request() req: AuthRequest) {
        this.serviceGateway.emitUserLoginEvent()
        return this.authService.login(req.user)
    }

    //authenticate me
    @IsPublic()
    @Get('me')
    authenticateUser(@CurrentUser() user: User) {
        console.log(user)
        return user
    }
}
