import { ChargeAddress } from './ChargeAddress';
import { DeliveryAddress } from './DeliveryAddress';
import { CreditCard } from './CreditCard';
import { Phone } from './Phone';

export interface IClientModel{
    id?: number;
    name?: string;
    gender?: string;
    dateBirth?: string;
    cpf?: string;
    phone?: Phone;
    email?: string;
    password?: string;
    chargeAddresses?: ChargeAddress[];
    deliveryAddresses?: DeliveryAddress[];
    creditCards?: CreditCard[];
    ranking?: number;
    active?: boolean;
}

export class Client {
    id: number;
    name: string;
    gender: string;
    dateBirth: string;
    cpf: string;
    phone: Phone;
    email: string; 
    password: string;
    chargeAddresses: ChargeAddress[];
    deliveryAddresses: DeliveryAddress[];
    creditCards: CreditCard[];
    ranking: number;
    active: boolean;

    constructor( {
        id = 0,
        name = '',
        gender = '',
        dateBirth = '',
        cpf = '',
        phone = new Phone({}),
        email = '',
        password = '',
        chargeAddresses = new Array<ChargeAddress>(),
        deliveryAddresses = new Array<DeliveryAddress>(),
        creditCards = new Array<CreditCard>(),
        ranking = 0,
        active = true
    }: IClientModel){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dateBirth = dateBirth;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.chargeAddresses = chargeAddresses;
        this.deliveryAddresses = deliveryAddresses;
        this.creditCards = creditCards;
        this.ranking = ranking;
        this.active = active;
    }

    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }
    get getName(): string {
        return this.name;
    }
    set setName(name: string){
        this.name = name;
    }
    get getGender(): string {
        return this.gender;
    }
    set setGender(gender: string){
        this.gender = gender;
    }
    get getDateBirth(): string {
        return this.dateBirth;
    }
    set setDateBirth(dateBirth: string) {
        this.dateBirth = dateBirth;
    }
    get getCpf(): string {
        return this.cpf;
    }
    set setCpf(cpf: string) {
        this.cpf = cpf;
    }
    get getPhone(): Phone {
        return this.phone;
    }
    set setPhone(phone: Phone) {
        this.phone = phone;
    }
    get getEmail(): string {
        return this.email;
    }
    set setEmail(email: string) {
        this.email = email;
    }
    get getPassword(): string {
        return this.password;
    }
    set setPassword(password: string) {
        this.password = password;
    }
    get getChargeAddresses(): ChargeAddress[] {
        return this.chargeAddresses;
    }
    set setChargeAddresses(chargeAddresses: ChargeAddress[]) {
        this.chargeAddresses = chargeAddresses;
    }

    get getDeliveryAddresses(): DeliveryAddress[] {
        return this.deliveryAddresses;
    }

    set setDeliveryAddresses(deliveryAddresses: DeliveryAddress[]) {
        this.deliveryAddresses = deliveryAddresses;
    }

    get getCreditCards(): CreditCard[] {
        return this.creditCards;
    }
    set setCreditCards(creditCards: CreditCard[]) {
        this.creditCards = creditCards;
    }
    get getRanking(): number {
        return this.ranking;
    }
    set setRanking(ranking: number) {
        this.ranking = ranking;
    }
    get isActive(): boolean {
        return this.active;
    }
    set setActive(active: boolean) {
        this.active = active;
    }
}