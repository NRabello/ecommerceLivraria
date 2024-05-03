export interface IBannerModel{
    id?: number;
    name?: string;
}

export class Banner {
    id: number;
    name: string;

    constructor({
        id = 0,
        name = '',
    }: IBannerModel){
        this.id = id;
        this.name = name;
    }

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
}