
export interface IPromotionalCoupon{
    id?: number;
    name?: string;
    value?: number;
}

export class PromotionalCoupon{
    public id: number;
    public name: string;
    public value: number;

    constructor( {
        id = 0,
        name = '',
        value = 0,
    }: IPromotionalCoupon){
        this.id = id;
        this.name = name;
        this.value = value;
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