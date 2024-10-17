import { IsEnum, IsNotEmpty, IsUUID } from "class-validator"
import { UserRole } from "../entities/user.entity"

export class UpdateRoleDto {

    @IsUUID()
    @IsNotEmpty()
    userId:string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    newRole: UserRole;
}