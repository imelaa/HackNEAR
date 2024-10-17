import { Controller,Post, Get, Body, Res, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Response } from 'express';
import { MintTicketDto } from './dto/mintTicket.dto';
import { Cipher } from 'crypto';
import { min } from 'rxjs';
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Get()
    getTickets(): string {
        return 'Tickets';
    }
    //this is the endpoint that will be called by the client to mint a ticket
    @Post('mint')
    async mintTicket(
        @Body() mintTicketDto: MintTicketDto,
        @Res()  res: Response){

        const { owner, ticketId, eventDetails } = mintTicketDto;
        const qrCode = await this.ticketsService.handleMinting(owner,ticketId,eventDetails);
        res.json({ qrCode });
    }
    
    //this is the endpoint that will be called by the client to verify a ticket
    @Get('verify/:ciphertext')
    async verifyTicket(
        @Param('ciphertext')ciphertext:string, 
        @Res() res: Response){
                try{
                    const metadata = this.ticketsService.decryptMetadata(ciphertext);
                    res.json({valid: true, metadata});     
                }   catch (err) {
                    res.json({valid: false, error: 'Invalid ticket or corrupted'});
                }
            }



}
