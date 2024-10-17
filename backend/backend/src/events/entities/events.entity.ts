import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    eventId: number;

    @Column('text', {
        nullable: false,
    })
    ownerAddress: string;

    @Column('text', {
        nullable: false,
    })
    place: string;

    @Column('text', {
        nullable: false,
    })
    timestamp: string;

    @Column('text', {
        nullable: true||false,
    })
    description: string;

    @Column('int', {
        nullable: false,
    })
    numberOfTickets: number;

    @Column('json', {
        nullable: false,
    })
    priceOfTickets: { vip: number; general: number };

    @Column('int', {
        nullable: false,
    })
    numberOfTicketsPurchased: number;

}