import { ETypeResidence } from './ETypeResidence';

export interface IDeliveryAddressModel{
    id?: number;
    typeresidence?: ETypeResidence;
    patioType?: string;
    publicArea?: string;
    numberAddrs?: string;
    neighborhood?: string;
    cep?: string;
    city?: string;
    state?: string;
    country?: string;
    observations?: string;
    nameAddrs?: string;
}

export class DeliveryAddress {
    id: number;
    typeresidence: ETypeResidence;
    patioType: string;
    publicArea: string;
    numberAddrs: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
    country: string;
    observations: string;
    nameAddrs: string;

    constructor({
        id = 0,
        typeresidence = ETypeResidence.HOUSE,
        patioType = '',
        publicArea = '',
        numberAddrs = '',
        neighborhood = '',
        cep = '',
        city = '',
        state = '',
        country = '',
        observations = '',
        nameAddrs = '',
    }:IDeliveryAddressModel){
        this.id = id;
        this.typeresidence = typeresidence;
        this.patioType = patioType;
        this.publicArea = publicArea;
        this.numberAddrs = numberAddrs;
        this.neighborhood = neighborhood;
        this.cep = cep;
        this.city = city;
        this.state = state;
        this.country = country;
        this.observations = observations;
        this.nameAddrs = nameAddrs;
    }

    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }
    get getTyperesidence(): ETypeResidence {
        return this.typeresidence;
    }
    set setTyperesidence(typeresidence: ETypeResidence) {
        this.typeresidence = typeresidence;
    }
    get getPatioType(): string {
        return this.patioType;
    }
    set setPatioType(patioType: string) {
        this.patioType = patioType;
    }
    get getPublicArea(): string {
        return this.publicArea;
    }
    set setPublicArea(publicArea: string) {
        this.publicArea = publicArea;
    }
    get getNumberAddrs(): string {
        return this.numberAddrs;
    }
    set setNumberAddrs(numberAddrs: string) {
        this.numberAddrs = numberAddrs;
    }
    get getNeighborhood(): string {
        return this.neighborhood;
    }
    set setNeighborhood(neighborhood: string) {
        this.neighborhood = neighborhood;
    }
    get getCep(): string {
        return this.cep;
    }
    set setCep(cep: string) {
        this.cep = cep;
    }
    get getCity(): string {
        return this.city;
    }
    set setCity(city: string) {
        this.city = city;
    }
    get getState(): string {
        return this.state;
    }
    set setState(state: string) {
        this.state = state;
    }
    get getCountry(): string {
        return this.country;
    }
    set setCountry(country: string) {
        this.country = country;
    }
    get getObservations(): string {
        return this.observations;
    }
    set setObservations(observations: string) {
        this.observations = observations;
    }

    get getNameAddrs(): string {
        return this.nameAddrs;
    }
    set setNameAddrs(nameAddrs: string) {
        this.nameAddrs = nameAddrs;
    }
}