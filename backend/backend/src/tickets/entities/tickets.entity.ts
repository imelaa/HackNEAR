import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    serialNumber: number; // Blockchain id

    @Column('text', {
        nullable: false,
    })
    owner: string; // Blockchain address of the owner

    @Column('decimal', {
        nullable: false,
    })
    price: number;

    @Column('date', {
        nullable: false,
    })
    dateOfPurchase: Date;

    @Column('json', {
        nullable: false,
    })
    eventInfo: {
        place: string;
        name: string;
        date: string;
        seat: string;
        additionalInfo: string;
    }; // Decentralized

    @Column('text', {
        nullable: false,
    })
    ticketType: string; // Vip, General Admission, etc // Decentralized

    @Column('date', {
        nullable: false,
    })
    expirationDate: Date; // Decentralized
    @Column('text', {
        nullable: false,
    })
    nftMetadataUri: string; // URI pointing to the NFT metadata

    @Column('text', {
        nullable: true,
    })
    additional: string;

    @Column('int', {
        nullable: false,
    })
    eventId: number;
}