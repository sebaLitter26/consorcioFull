import { Appartment } from "../consorcio/appartments";

export interface CustomCard<T> {
    header: string;
    icon: string;
    prop: keyof T;
    color: string;
}

export interface User {
    id: string;
    name: string;
    modifierId?: String,
  	rol: string;
    phone?: string;
    isActive: boolean;
    email: string;
    appartmentId?: string;
    appartment?: Appartment;
    notes?: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
}
