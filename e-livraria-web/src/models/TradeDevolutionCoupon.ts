import { Client } from "./Client";

export interface ITradeDevolutionCoupon{
    id?: number;
    name?: string;
    value?: number;
    client?: Client
    used?: boolean;
}

export class TradeDevolutionCoupon{
    id: number;
    name: string;
    value: number;
    client: Client;
    used: boolean;

    constructor( {
        id = 0,
        name = '',
        value = 0,
        client = new Client({}),
        used = false
    }: ITradeDevolutionCoupon){
        this.id = id;
        this.name = name;
        this.value = value;
        this.client = client;
        this.used = used;
    }

    // get id(){
    //     return this._id;
    // }
    // set id(id: number){
    //     this._id = id;
    // }

    // get name(){
    //     return this._name;
    // }
    // set name(name: string){
    //     this._name = name;
    // }

    // get value(){
    //     return this._value;
    // }
    // set value(value: number){
    //     this._value = value;
    // }
}