import { Book } from "./Book";

export interface ICategory{
    id?: number;
    name?: string;
    books?: Book[];
}

export class Category {
    private _id: number;
    private _name: string;
    private _books: Book[];

    constructor({
        id = 0,
        name = '',
        books = []
    }: ICategory){
        this._id = id;
        this._name = name;
        this._books = books;
    }

    get id(): number{
        return this._id;
    }

    set id(id: number){
        this._id = id;
    }

    get name(): string{
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }

    get books(): Book[]{
        return this._books;
    }

    set books(books: Book[]){
        this._books = books;
    }
}