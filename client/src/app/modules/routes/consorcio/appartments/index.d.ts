import { User } from "../../user"
import { Building } from "../building"

export interface BuildingListFilters {
    buildingId: string | null,
}


export interface Appartment {
    id:      string 
    createdAt:   String
    updatedAt:   string
    observation: string
    floor:       number
    letter:      string
    building:    Building
    buildingId:  string
    users:      User[]
}

/** Payload para informar un appartment */
export interface AppartmentRegistry extends Appartment {
    error: boolean;
}

/** Payload para informar un appartment */
export interface AppartmentSelection extends Appartment {
    selected?: boolean;
}

/** Payload para la creacion de un building */
export interface CreateAppartmentPayload{
    buildingId: string
    observation: string
    floor: number
    letter: string
}

/** Payload para informar un building */
export interface UpdateBuildingPayload extends CreateAppartmentPayload {
    id: string;
}

//----------------------------------------------

export interface CuposUpdatePayload {
    cuponuevo: number;
    //ntuser: string;
    tipo: string;
    idhecf: number;
    //ip: string;
}


export interface CupoSeleccionado {
    SUCURSAL: string;
    TIPO: string;
    BANDAS: number[];
}

export interface CupoSucursal{
    idhorariosentregacuposfecha: number;
    nomfecha:string;
    dia: number;
    hora: number;
    cupomaximo: number;
    cupomaximonuevo: number;
    cupoutilizado: number;
    error: boolean;
}

export interface CupoSelection{
    selected?: boolean;
    idhorariosentregacuposfecha: number;
    nomfecha:string;
    dia: number;
    hora: number;
    cupomaximo: number;
    cupomaximonuevo: number;
    cupoutilizado: number;
    error: boolean;
}

export interface UpdateResponse{
    error: number[];
    ok: number[];
}

export interface CuposHistorico{
    cuposofrecidos: number;
    cuposvendidos: number;
    diasemana:string;
    fecha: string;
    horacupo: string;
    nrosemana: string;
    promediosemanalcuposofrecidos: number;
    promediosemanalcuposvendidos: number;
    semanafin: string;
    semanainicio: string;
    sucursal: number;
    vendidosofrecidos: number;
}

export interface Sucursal{
    id_suc: number;
    localidad: string;
    direccion: string;
    descripcion: string;
}
