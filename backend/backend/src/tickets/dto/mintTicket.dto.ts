import { isString, isNotEmpty,IsObject, IsString, IsNotEmpty} from "class-validator";

export class MintTicketDto {

  @IsString()
  @IsNotEmpty()
    owner: string;

  @IsString()
  @IsNotEmpty()
    ticketId: string;

  @IsObject()
  @IsNotEmpty()
    eventDetails: object;

}
