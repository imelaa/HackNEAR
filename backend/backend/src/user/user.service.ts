import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { UpdateRoleDto } from './dto/update-role.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async finbByWalletId(walletId: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: {walletId} });
    }

    async findbyId(userId:string): Promise<User>{
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if(!user){
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        return user;
    }

    async createUser(walletId:string ): Promise<User> {
        const existingUser = await this.finbByWalletId(walletId);
        if(existingUser){
            throw new BadRequestException(`User with walletId ${walletId} already exists`);
        }
        const user = this.userRepository.create({ walletId });
        return this.userRepository.save(user);
    }

    async updateUserRole(updateRoleDto: UpdateRoleDto): Promise<User> {
        const { userId, newRole } = updateRoleDto;

        const user = await this.findbyId(userId);
        // only admins can update roles to other than admin
        if (user.role === UserRole.ADMIN && newRole !== UserRole.ADMIN){ 
            throw new BadRequestException('Only admins can update roles to other than admin');
        }
        user.role = newRole;
        return this.userRepository.save(user);
    }

}