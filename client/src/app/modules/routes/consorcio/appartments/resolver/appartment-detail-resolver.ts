import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { BuildingService } from "../services/buildings.service";
import { BuildingDetail } from "../../building";

/**
 * Es un resolver para precargar los conteos, se utiliza en el Counts module
 */
@Injectable()
export class AppartmentDetailResolver {

    constructor(
        private buildingService: BuildingService
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BuildingDetail> {
        return this.buildingService.getBuildingDetails(route.queryParams.id);
    }
}