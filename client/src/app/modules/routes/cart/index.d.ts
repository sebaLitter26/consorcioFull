import { Building } from "../consorcio/building";


/**El producto a vender */
export interface Product {
    id: string,
    brand: string,
    name: string,
    description: string,
    images: string[],
    price:number,
    stock:number
}

export interface Cart {
    productId: string,
    price:number,
    quantity: number;
}

/**Los pedidos previos hechos en ese departamento */
export interface Order {
    appartmentId?: string,
    //userId?: string,
    phone?: string,
    observation?: string,
    //cart: Cart[],
}

/**Los pedidos previos hechos en ese departamento */
export interface ProductsOnOrder {
    cart: Cart[],
}

export interface ResolvedData {
    products: Product[],
    orders: Order[],
    buildings: Building[]
}