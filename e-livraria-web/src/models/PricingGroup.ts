export interface IPricingGroup{
    id?: number;
    name?: string;
    discount?: number;
}
export class PricingGroup {
    private _id: number;
    private _name: string;
    private _discount: number;

    constructor({
        id = 0,
        name = '',
        discount = 0
    }: IPricingGroup) {
        this._id = id;
        this._name = name;
        this._discount = discount;
    }

    get id(): number {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    get discount(): number {
        return this._discount;
    }
    set discount(discount: number) {
        this._discount = discount;
    }
}