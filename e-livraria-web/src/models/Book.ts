import { PricingGroup } from "./PricingGroup";
import { Category } from "./Category";

export interface IBook {
    id?: number;
    name?: string;
    author?: string;
    price?: number;
    imageSrc?: string;
    imageAlt?: string;
    synopsis?: string;
    categories?: Category[];
    year?: string;
    publishing_company?: string;
    edition?: string;
    isbn?: string;
    pages?: number;
    pricingGroup?: PricingGroup;
  }

export class Book {
    public id: number;
    public name: string;
    public author: string;
    public price: number;
    public imageSrc: string;
    public imageAlt: string;
    public synopsis: string;
    public categories: Category[];
    public year: string;
    public publishing_company: string;
    public edition: string;
    public isbn: string;
    public pages: number;
    public pricingGroup: PricingGroup;

    constructor( {
        id = 0,
        name = '',
        author = '',
        price = 0,
        imageSrc = '',
        imageAlt = '',
        synopsis = '',
        categories = [],
        year = '',
        publishing_company = '',
        edition = '',
        isbn = '',
        pages = 0,
        pricingGroup = new PricingGroup({}),
    }: IBook){
        this.id = id;
        this.name = name;
        this.author = author;
        this.price = price;
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.synopsis = synopsis;
        this.categories = categories;
        this.year = year;
        this.publishing_company = publishing_company;
        this.edition = edition;
        this.isbn = isbn;
        this.pages = pages;
        this.pricingGroup = pricingGroup;
    }
}
