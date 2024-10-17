import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor ( 
        private UserService:UserService,
        private JwtService:JwtService,
    ) {}

    async validateuser(walletId:string): Promise<User>{
        const user = await this.UserService.finbByWalletId(walletId);
        if(user){
            return user;
        }
        return null;
    }
    
    async login(user: User): Promise<{access_token:string}>{
        const payload = { username: user.walletId, sub: user.id, role:user.role};
        return {
            access_token: this.JwtService.sign(payload),
        };
    }

}
