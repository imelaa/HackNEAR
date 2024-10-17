import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as QRCode from 'qrcode';
import {ethers} from 'ethers';

@Injectable()
export class TicketsService {

    private readonly encryptionKey = process.env.ENCRYPTION_KEY;

  // Encrypt metadata and return as encrypted string (ciphertext)
    encryptMetadata(metadata: object): string {
    const metadataString = JSON.stringify(metadata);
    const ciphertext = CryptoJS.AES.encrypt(metadataString, this.encryptionKey).toString();
    return ciphertext;
  }

  // Decrypt metadata and return as JSON
    decryptMetadata(ciphertext: string): object {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }

  // Generate QR Code from encrypted metadata and return data URL
    async generateQRCode(encryptedData: string): Promise<string> {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(encryptedData);
      return qrCodeDataURL;
    } catch (err) {
      throw new Error('Failed to generate QR code');
    }
  }

  // Create ticket metadata and return as object
    createTicketMetadata(owner:string,ticketId: string, eventDetails: object): object {
    return {
      owner: owner,
      ticket_id: ticketId,
      event: eventDetails,
      issued_at: new Date().toISOString(),
    };
  }

  // Handle function to handle ticket minting and QR code generation
    async handleMinting(owner:string, ticketId: string, eventDetails: object): Promise<string> {
    const metadata = this.createTicketMetadata(owner,ticketId, eventDetails);
    const encryptedMetadata = this.encryptMetadata(metadata);
    const qrCode = await this.generateQRCode(encryptedMetadata);
    return qrCode;
  }
}