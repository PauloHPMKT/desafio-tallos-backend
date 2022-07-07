import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth.request';

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }
}
