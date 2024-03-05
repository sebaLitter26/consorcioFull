import { Building } from "../consorcio/building";


/**El producto a vender */
export interface Product {
    id: string,
    brand: string,
    name: string,
    description: string,
    picture: string,
    price:number,
    stock:number
}

export interface Cart {
    id: string,
    price:number,
    quantity: number;
}

/**Los pedidos previos hechos en ese departamento */
export interface Order {
    buildingId?: string,
    depto?: string,
    floor?: number,
    phone?: string,
    observaciones?: string,
    cart: Cart[],
}

export interface ResolvedData {
    products: Product[],
    orders: Order[],
    buildings: Building[]
}