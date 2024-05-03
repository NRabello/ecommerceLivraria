import { Client } from "./Client";
import { TradeDevolutionCoupon } from "./TradeDevolutionCoupon";
import { PromotionalCoupon } from "./PromotionalCoupon";
import { CreditCard } from "./CreditCard";
import { DeliveryAddress } from "./DeliveryAddress";
import { OrderItem } from "./OrderItem";
import { EOrderStatus } from "./EOrderStatus";

export interface IOrder{
    id?: number;
    client?: Client
    status?: EOrderStatus;
    //temporaryDeliveryAddress?: DeliveryAddress;
    creditCards?: CreditCard[];
    orderItens?: OrderItem[];
    tradeDevolutionCoupons?: TradeDevolutionCoupon[];
    promotionalCoupon?: PromotionalCoupon;
    totalValue?: number;
    orderedOn?: Date;
}

export class Order {
    public id: number;
    public client: Client;
    public status: EOrderStatus;
    //public temporaryDeliveryAddress: DeliveryAddress;
    public creditCards: CreditCard[];
    public orderItens: OrderItem[];
    public tradeDevolutionCoupons: TradeDevolutionCoupon[];
    public promotionalCoupon: PromotionalCoupon;
    public totalValue: number;
    public orderedOn: Date;

    constructor( {
        id = 0,
        client = new Client({}),
        status = EOrderStatus.EM_PROCESSAMENTO,
        //temporaryDeliveryAddress = new DeliveryAddress({}),
        creditCards = [],
        orderItens = [],
        tradeDevolutionCoupons = [],
        promotionalCoupon = new PromotionalCoupon({}),
        totalValue = 0,
        orderedOn = new Date(),
    }: IOrder){
        this.id = id;
        this.client = client;
        this.status = status;
        //this.temporaryDeliveryAddress = temporaryDeliveryAddress;
        this.creditCards = creditCards;
        this.orderItens = orderItens;
        this.tradeDevolutionCoupons = tradeDevolutionCoupons;
        this.promotionalCoupon = promotionalCoupon;
        this.totalValue = totalValue;
        this.orderedOn = orderedOn;
    }

    // get id(){
    //     return this._id;
    // }
    // set id(id: number){
    //     this._id = id;
    // }

    // get client(){
    //     return this._client;
    // }
    // set client(client: Client){
    //     this._client = client;
    // }

    // get status(){
    //     return this._status;
    // }
    // set status(status: string){
    //     this._status = status;
    // }

    // get deliveryAddress(){
    //     return this._deliveryAddress;
    // }
    // set deliveryAddress(deliveryAddress: DeliveryAddress){
    //     this._deliveryAddress = deliveryAddress;
    // }

    // get creditCards(){
    //     return this._creditCards;
    // }
    // set creditCards(creditCards: CreditCard[]){
    //     this._creditCards = creditCards;
    // }

    // get orderItens(){
    //     return this._orderItens;
    // }
    // set orderItens(orderItens: OrderItem[]){
    //     this._orderItens = orderItens;
    // }

    // get coupons(){
    //     return this._coupons;
    // }
    // set coupons(coupons: Coupon[]){
    //     this._coupons = coupons;
    // }

    // get totalValue(){
    //     return this._totalValue;
    // }
    // set totalValue(totalValue: number){
    //     this._totalValue = totalValue;
    // }

    // get orderedOn(){
    //     return this._orderedOn;
    // }
    // set orderedOn(orderedOn: Date){
    //     this._orderedOn = orderedOn;
    // }
}