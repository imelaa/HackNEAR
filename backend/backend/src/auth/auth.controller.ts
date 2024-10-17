import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}
    @Post('login')
    async login (@Body('walletId') walletId:string){

        const user = await this.authService.validateuser(walletId);
        if (!user){
            throw new UnauthorizedException('Invalid credentials (walletId)');
        }
        return this.authService.login(user);
    }


    @Post('register')
    async register(@Body('walletId') walletId: string){
        const user = await this.userService.createUser(walletId);
        return this.authService.login(user);
    }

}
