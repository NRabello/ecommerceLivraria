import { CreditCard } from "../models/CreditCard";
import { CardBanner } from "../models/Banner";

const creditCards: CreditCard[] = [
    new CreditCard({
        id: 1,
        number: "1234 5678 9012 3456",
        nameCard: "John Doe",
        cardBanner: new CardBanner({
            id: 1,
            name: "Visa"
        }),
        expirationDate: "12/25",
        securityCode: "123"
    }),
    new CreditCard({
        id: 2,
        number: "9876 5432 1098 7654",
        nameCard: "Jane Smith",
        cardBanner: new CardBanner({
            id: 2,
            name: "Mastercard"
        }),
        expirationDate: "09/23",
        securityCode: "456"
    })
];

export default creditCards;
