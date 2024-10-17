
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any): Promise<Partial<User>>{
        const user = await this.userService.findbyId(payload.sub);
        if (!user){
            throw new UnauthorizedException('Invalid Token');
        }
        return user;
    }
}