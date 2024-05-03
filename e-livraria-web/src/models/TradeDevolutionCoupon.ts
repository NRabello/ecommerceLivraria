
export interface ITradeDevolutionCoupon{
    id?: number;
    name?: string;
    value?: number;
}

export class TradeDevolutionCoupon{
    private _id: number;
    private _name: string;
    private _value: number;

    constructor( {
        id = 0,
        name = '',
        value = 0,
    }: ITradeDevolutionCoupon){
        this._id = id;
        this._name = name;
        this._value = value;
    }

    get id(){
        return this._id;
    }
    set id(id: number){
        this._id = id;
    }

    get name(){
        return this._name;
    }
    set name(name: string){
        this._name = name;
    }

    get value(){
        return this._value;
    }
    set value(value: number){
        this._value = value;
    }
}