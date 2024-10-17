import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entity';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [
    TypeOrmModule.forFeature([Ticket]),//entities
  ],
  
})
export class TicketsModule {}
