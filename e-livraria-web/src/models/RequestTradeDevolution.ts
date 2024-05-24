import { Order } from "./Order";
import { OrderItem } from "./OrderItem";

export interface IRequestTradeDevolution{
    id?: number;
    order?: Order;
    active?: boolean;
    requestItens?: OrderItem[];
    date?: Date;
    value?: number;
}

export class RequestTradeDevolution {
    public id: number;
    public order: Order;
    public active: boolean;
    public requestItens: OrderItem[];
    public date: Date;
    public value: number;

    constructor( {
        id = 0,
        order = new Order({}),
        active = true,
        requestItens = [],
        date = new Date(),
        value = 0
    }: IRequestTradeDevolution){
        this.id = id;
        this.order = order;
        this.active = active;
        this.requestItens = requestItens;
        this.date = date;
        this.value = value;
    }
}