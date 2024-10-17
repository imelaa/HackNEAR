import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false,
        unique: true
    })
    account: string; // Wallet address

    @Column('text', {
        nullable: false,
        unique: true,
    })
    username: string;

    @Column('text', {
        nullable: false,
    })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

}