export interface ClientInfo { 
    userId?: string;
    cardNumber?: string;
    expirationDate?: string;
    cvc?: string;
    idMovie?: number;
    ticketId?: number;
    seats?: Array<string>;
    totalPrice?: number;
}
