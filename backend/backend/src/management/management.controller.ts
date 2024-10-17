import { Controller, Get, Post } from '@nestjs/common';

@Controller('management')
export class ManagementController {

    @Get()
    getManagement(): string {
        return 'Management';
    }

    @Post()
    createEvent(){
        return 'Event created';
    }

}
