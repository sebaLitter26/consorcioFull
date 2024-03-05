import { ProductState } from "./model";

export interface Product{
    id: string;
    name: string;
    images: string[];
    price: number;
    stock: number;
    brand: string;
    description?: string;
    updatedAt: string;

}

/** Payload para la creacion de un Product */
export interface CreateProductPayload{
    name: string;
    images: string[] | null
    price: number
    stock: number
    brand: string
    description?: string
}

/** Payload para informar un product */
export interface UpdateProductPayload extends CreateProductPayload {
    id: string;
}

/** Payload para cancelar un Product */
export interface IDProductPayload {
    id: string
}


export interface ProductStateStyle {
    label: string;
    color: string;
    backgroundColor: string;
}

export type ActionName = "update" | "delete";


/** La accion que se puede realizar del building */
export interface ProductAction {
    name: ActionName;
    title: string;
    icon: string;
    color?: string;
    availableStates: ProductState[] | null;
    permission?: string;
}

export interface ProductListFilters {
    address: string | null
    location: string | null
    floors: number | null
}

export interface CustomCard {
    header: string;
    icon: string;
    value: string;
    color: string;
}