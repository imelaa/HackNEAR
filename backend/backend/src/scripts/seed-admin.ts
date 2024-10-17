import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { UserService } from "../user/user.service";
import { UserRole } from "../user/entities/user.entity";

//seed with admin user for testing purposes
async function bootstrap(){
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService = app.get(UserService);

    const adminWalletid = 'admin.near';

    const existingAdmin = await userService.finbByWalletId(adminWalletid);
    if (existingAdmin){
        console.log('Admin user already exists');
    } else {
        const adminUser = await userService.createUser(adminWalletid);

        await userService.updateUserRole({
            userId: adminUser.id,
            newRole: UserRole.ADMIN,
        });
        console.log('Admin user created');
    }
    await app.close();
}

bootstrap();