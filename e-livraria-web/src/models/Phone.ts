import { Client } from './Client';

export interface IPhoneModel{
        id?: number;
        type?: string;
        ddd?: string;
        number?: string;
    
}

export class Phone {
    id: number;
    type: string;
    ddd: string;
    number: string;


    constructor({
        id = 0,
        type = '',
        ddd = '',
        number = '',
    }: IPhoneModel){
        this.id = id;
        this.type = type;
        this.ddd = ddd;
        this.number = number;
    }

    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }
    get getType(): string {
        return this.type;
    }
    set setType(type: string) {
        this.type = type;
    }
    get getDdd(): string {
        return this.ddd;
    }
    set setDdd(ddd: string) {
        this.ddd = ddd;
    }
    get getNumber(): string {
        return this.number;
    }
    set setNumber(number: string) {
        this.number = number;
    }
}