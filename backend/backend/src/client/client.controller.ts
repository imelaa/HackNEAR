import { Controller, Get } from '@nestjs/common';

@Controller('client')
export class ClientController {


    @Get('client')
    getClient(): string {
        return 'Client';
    }
    
    

}
