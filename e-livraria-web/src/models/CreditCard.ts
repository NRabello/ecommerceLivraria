import { Banner } from './Banner';

export interface ICreditCardModel {
    id?: number;
    number?: string;
    nameCard?: string;
    banner?: Banner;
    expirationDate?: string;
    securityCode?: string;
}
export class CreditCard {
    id: number;
    number: string;
    nameCard: string;
    banner: Banner;
    expirationDate: string;
    securityCode: string;

    constructor({
        id = 0,
        number = '',
        nameCard = '' ,
        banner = new Banner({}),
        expirationDate = '',
        securityCode = '',
    }: ICreditCardModel){
        this.id = id;
        this.number = number;
        this.nameCard = nameCard;
        this.banner = banner;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;
    }

    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }
    get getNumber(): string {
        return this.number;
    }
    set setNumber(number: string) {
        this.number = number;
    }
    get getNameCard(): string {
        return this.nameCard;
    }
    set setNameCard(nameCard: string) {
        this.nameCard = nameCard;
    }
    get getBanner(): Banner {
        return this.banner;
    }
    set setBanner(banner: Banner) {
        this.banner = banner;
    }
    get getExpirationDate(): string {
        return this.expirationDate;
    }
    set setExpirationDate(expirationDate: string) {
        this.expirationDate = expirationDate;
    }
    get getSecurityCode(): string {
        return this.securityCode;
    }
    set setSecurityCode(securityCode: string) {
        this.securityCode = securityCode;
    }
}