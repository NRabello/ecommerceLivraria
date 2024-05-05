import { CreditCard } from './CreditCard';

export interface IPaymentMethod {
    id?: number;
    creditCard?: CreditCard;
    value?: number;
}

export class PaymentMethod {
    public id: number;
    public creditCard: CreditCard;
    public value: number;

    constructor({
        id = 0,
        creditCard = new CreditCard({}),
        value = 0,
    }: IPaymentMethod) {
        this.id = id;
        this.creditCard = creditCard;
        this.value = value;
    }
    
}
