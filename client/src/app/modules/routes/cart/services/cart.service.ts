import { Apollo } from 'apollo-angular';
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Building, BuildingListFilters } from '../../consorcio/cargas/building';
import { BUILDINGS } from '../../consorcio/cargas/building/services/building.graphql';
import { Order, Product } from '..';
import { ORDERS, PRODUCTS } from './graphql';

const DEFAULT_BUILDING_FILTERS: BuildingListFilters = {
    address: null,
    location: null,
    floors: null
}

/* const DEFAULT_PRODUCT_FILTERS: ProductListFilters = {
    address: null,
    location: null,
    floors: null
} */



@Injectable()
export class CartService {

    constructor(
        
        public apollo: Apollo,
    ) {}


    convertJsonToUrlParams(data:any){
        return Object.keys(data).map(function(k) {
            return (data[k]) ? encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) : ''
        }).join('&');
    }

    /**
     * Obtiene el listado de Products
     * @returns un Observable con el listado de products 
     */
    getProducts(): Observable<Product[]>{
        return this.apollo.watchQuery({
            query: PRODUCTS,
            //variables: DEFAULT_PRODUCT_FILTERS,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => result.data.products));
    }

    getOrdersByAppartment(appartmentId: string) {
        console.log('getOrdersByAppartment', appartmentId);
        
        return this.apollo.watchQuery({
            query: ORDERS,
            variables: {appartmentId},
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => result.data.products));

    }

    /**
     * Obtiene el listado de buildings
     * @returns un Observable con el listado de buildings 
     */
    getBuildings(): Observable<Building[]>{
        return this.apollo.watchQuery({
            query: BUILDINGS,
            variables: DEFAULT_BUILDING_FILTERS,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => result.data.buildings));
    
        //return this.http.post<Building[]>(`${environment.apiUrl}/getbuildings`, filters);
    }

    getOrdersByPhone(phone: number): Observable<Order[]> {
        return of([]);
        //this.http.get<Order[]>(`${environment.apiUrl}/getOrdersByPhone?PHONE=${phone}`).pipe(take(1), share());
        
    }

    createOrder(order: Order): Observable<Order> {
        //const updateCreate =(order.id>0) ? 'UpdateOrder' : 'InsertOrder';
        return of()
        //this.http.post<Order>(`${environment.apiUrl}/${updateCreate}`, order);
        
    }


    /* getOrders(filter: FilterPsico): Observable<Psico[]> {
        return this.http.post<Psico[]>(`${environment.apiUrl}${RRHH}/GetPsico`, filter );
        
    } */

}