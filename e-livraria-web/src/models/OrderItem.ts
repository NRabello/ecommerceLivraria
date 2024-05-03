import { Book } from './Book';

export interface IOrderItem {
    id?: number;
    book?: Book;
    quantity?: number;
    value?: number;
}

export class OrderItem {
    public id: number;
    public book: Book;
    public quantity: number;
    public value: number;

    constructor({
        id = 0,
        book = new Book({}),
        quantity = 1,
        value = 0,
    }: IOrderItem) {
        this.id = id;
        this.book = book;
        this.quantity = quantity;
        this.value = value;
    }
    
    get total() {
        return this.quantity * this.value;
    }
}
