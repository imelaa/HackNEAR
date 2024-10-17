import { UpdateRoleDto } from './dto/update-role.dto';
import { UserService } from './user.service';
import { Controller, Put, UseGuards, ValidationPipe, Body, Get, Param, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly UserService: UserService) {}

    @Put('update-role')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN) //only admin can update roles
    async updateRole(
        @Body(new ValidationPipe())UpdateRoleDto: UpdateRoleDto)
            {
            const updateUser = await this.UserService.updateUserRole(UpdateRoleDto);
            return { walletId: updateUser.walletId, role: updateUser.role };
            }

    @Get(':walletId')
    @UseGuards(JwtAuthGuard)
    async getUserRole(@Param('walletId') walletId: string){
        const user = await this.UserService.finbByWalletId(walletId);
        if (user){
            return { walletId: user.walletId, role: user.role };
        }
        return {message: 'User not found'};

    }

    @Post('create')
    async createUser(@Body('walletId') wallerId:string){
        const user =await this.UserService.createUser(wallerId);
        return { walletId: user.walletId, role: user.role };
    }
}
