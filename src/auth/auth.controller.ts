import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentuser.decorator';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth.request';

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    //login
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Request() req: AuthRequest) {
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
