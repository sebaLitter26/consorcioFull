
import { Product } from "./consorcio/product";



export interface error {
    CODIGO: number;
    MENSAJE: string;
}


export interface CustomCard {
    header: string;
    icon: string;
    value: string;
    color: string;
}

export interface Identification{

    building: string;
    depto: string;
    floor: number;
    phone: number;
}


export interface Order extends Identification{
    cart: Product[];
    observaciones: string;
    id: number;
}


