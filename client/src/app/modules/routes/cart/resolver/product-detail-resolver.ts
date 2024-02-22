import { Injectable, ViewContainerRef } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of, switchMap, tap } from "rxjs";
import { Building } from "../../model";
import { CartService } from "../services/cart.service";
import { Order, Product, ResolvedData } from "..";
import { ProfileService } from "../../../main/services/profile.service";

/**
 * Es un resolver para precargar los Pedidos, se utiliza en el Operations module
 */
@Injectable()
export class ProductDetailResolver {

    constructor(
        private cartService: CartService,
        public router: Router,
        
        public profileService: ProfileService,
    ) {}
    
    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<ResolvedData> | null {

        const resolvedData: ResolvedData = {
            products: [],
            orders: [],
            buildings: []
        }

        return this.cartService.getProducts().pipe(
            tap((products: Product[]) => {
                resolvedData.products = products;
            }),
            switchMap((buildings) => !this.profileService.user.appartment?.id ? of([]) : this.cartService.getBuildings()),
            tap( (buildings: Building[] ) => {
                resolvedData.buildings = buildings;
            }),
            switchMap((userSerial) =>   of([])),  // this.cartService.getOrdersByAppartment() 
            tap((orders: Order[]) => {
                resolvedData.orders = orders;
            }),
            switchMap(dispositionOptions => of(resolvedData)),
        );

        

        /*
         if(Object.keys(route.queryParams).length === 0) 
            this.router.navigate(['recursos/carga-psicotecnico']); 


            

        return this.controlService.getUserSerial().pipe(
            tap((userSerial: UserControl | null) => {
                resolvedData.controlType = userSerial?.id_proceso ?? ControlType.RETURN;
            }),
            switchMap((userSerial) => userSerial ? this.reportService.getQualitySerialDetail(userSerial.id_series.split(",")[0]) : of(null)),
            tap((serialDetail: SerialDetail | null) => {
                resolvedData.serialDetail = serialDetail;
            }),
            switchMap(userSerial => this.stationConfigurationService.getStationConfig()),
            catchError(error => of<StationConfiguration>({
                process: null,
                hostname: null,
                ubication: null,
                subUbication: null,
                printers: [],
            })),
            tap(stationConfiguration => {
                resolvedData.stationConfiguration = stationConfiguration;
            }),
            switchMap(stationConfiguration => this.controlService.getDispositions()),
            tap(dispositionOptions => {
                resolvedData.dispositionOptions = dispositionOptions;
            }),
            switchMap(dispositionOptions => of(resolvedData)),
        );
            console.log('resolve',route.data,route.queryParams );
            
        
        
        
        return (Object.keys(route.queryParams).length === 0) ? null : this.cartService.getOrdersByPhone(route.queryParams.order.phone);
            */
    }
}