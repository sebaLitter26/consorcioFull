
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Apollo } from 'apollo-angular';
import { CREATE_PRODUCT, DELETE_PRODUCT, PRODUCT, PRODUCTS, UPDATE_PRODUCT } from "./product.graphql";
import { CreateProductPayload, Product, UpdateProductPayload } from "..";

@Injectable()      
export class ProductService {
    
    constructor(
        public apollo: Apollo,
    ) {}



    
    //Shared Product -----------------------------------------

    /** Un subject que es llamado cuando se hace una modificacion en los conteos y hay que actualizar la tabla. */
    private updateProductEventSource = new Subject<boolean>();

    /** Evento disparado cuando se tiene que actualizar la tabla de conteos. */
    updateProductEvent: Observable<boolean> = this.updateProductEventSource.asObservable();

    /* Products: Product[] = [];

    Product: Product | null = null;  */

    /**
     * Avisa a los observers que hay que actualizar la tabla
     */
    updateTable() {
        this.updateProductEventSource.next(true);
    }


    //-------------------------------------------------

    /**
     * Obtiene el listado de Products
     * @returns un Observable con el listado de Products 
     */
    getProducts( ): Observable<Product[]>{   // filters : ProductListFilters = DEFAULT_Product_FILTERS 
        return this.apollo.watchQuery({
            query: PRODUCTS,
            //variables: filters,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => result.data.products));
    
    }


    /**
     * Crea un Product nuevo 
     * @return un observable con el resultado de la peticion
     */
    createProduct(createProductPayload: CreateProductPayload): Observable<Product>{
        console.log(createProductPayload);
        return this.apollo.mutate({
            mutation: CREATE_PRODUCT,
            variables: {input: createProductPayload},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.Product;
        }));
        //return this.http.post(`${environment.apiUrl}/createProduct`, createProductPayload);

        /* return this.ipService.getIP().pipe(
            //tap(ip => createProductPayload.hostname = ip),
            switchMap(() => )
        ); */
    }
    
    /**
     * Envia el id de un Product para que se le cambie el estado a informado
     * @return un observable con el resultado de la peticion
     */
    updateProduct(updateProductPayload: UpdateProductPayload): Observable<Product>{

        return this.apollo.mutate({
            mutation: UPDATE_PRODUCT,
            variables: {input: updateProductPayload},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.updateProduct;
        }));

    }

    /**
     * Envia el id de un edificio para que se elimine
     * @return un observable con el edificio eliminado
     */
    deleteProduct(productId: string): Observable<Product> {
        /* const payload: IDproductPayload = {
            id: productId
        } */

        return this.apollo.mutate({
            mutation: DELETE_PRODUCT,
            variables: {id: productId},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.product;
        }));
    
    }

    /**
     * Obtiene el detalle de un Product
     * @return un observable con el detalle de un Product
     */
    
    getProductDetails(productId: string): Observable<Product> { //ProductDetail
      
        return this.apollo.mutate({
            mutation: PRODUCT,
            variables: {id: productId},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.Product;
        }));
    
    }
} 