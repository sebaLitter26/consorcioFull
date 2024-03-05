import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { DynamicTableModule } from '../../ui/dynamic-table/dynamic-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoolDirectivesModule } from '../../ui/cool-input/cool-directives/cool-directives.module';
import { CoolInputModule } from '../../ui/cool-input/cool-input.module';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { DatePipe } from '@angular/common';
import { ProcessStatusModule } from '../../process-status/process-status.module';
import { RoutesCommonModule } from '../../common/routes-common.module';
import { LoadersModule } from "../../ui/loaders/loaders.module";
import { DashboardCardModule } from '../../ui/dashboard-card/dashboard-card.module';
import { CargasComponent } from './cargas/cargas.component';
import { UserModule } from '../user/user.module';
import { CoolFileInputModule } from '../../ui/cool-file-input/cool-file-input.module';
import { FloorPipe } from "../../ui/cool-file-input/pipes/floor.pipe";

import { ProductComponent } from './product/product-list/product-list.component';
import { ClientComponent } from './client/client.component';

import { BuildingListComponent } from './building/building-list/buildings-list.component';
import { CreateBuildingFormComponent } from './building/building-list/edit-building-form/create-building-form.component';
//import { BuildingDetailComponent } from './building/building/building-detail.component';
/* import { BuildingSerialsListComponent } from './building/building/building-serial-detail-list/building-serial-detail-list.component';
import { BuildingEventsListComponent } from './building/building/building-event-detail-list/building-event-detail-list.component'; */

import { AppartmentsListComponent } from './appartments/appartments-list/appartment-list.component';
import { AppartmentComponent } from './appartments/appartment/appartment.component';
import { AppartmentComponentRegistry } from './appartments/appartment-registry/appartment-registry.component';
import { AppartmentService } from './appartments/services/appartment.service';
import { AppartmentSharedService } from './appartments/services/appartment-shared.service';

import { BuildingService } from './building/services/buildings.service';
import { BuildingSharedService } from './building/services/buildings-shared.service';
import { ProductService } from './product/services/product.service';
import { CargasService } from './cargas/services/cargas.service';
import { ProductActionsComponent } from './product/product-list/product-actions/product-actions.component';
import { CreateProductFormComponent } from './product/product-list/edit-product-form/create-product-form.component';
import { BuildingActionsComponent } from './building/building-list/building-actions/building-actions.component';
import { BuildingsListFiltersComponent } from './building/building-list/buildings-list-filters/buildings-list-filters.component';


const routes: Routes = [
    {
        path: '',
        component: CargasComponent,
    },
  
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        DynamicTableModule,
        ReactiveFormsModule,
        CoolDirectivesModule,
        CoolInputModule,
        AuthorizationModule,
        ProcessStatusModule,
        RoutesCommonModule,
        LoadersModule,
        DashboardCardModule,
        UserModule,
        CoolFileInputModule
    ],
    declarations: [
        
        CargasComponent,


        ProductComponent,
        CreateProductFormComponent,
        ProductActionsComponent,


        ClientComponent, 


        //Building
        BuildingListComponent,
        CreateBuildingFormComponent,
        BuildingActionsComponent,
        BuildingsListFiltersComponent,
        /* BuildingDetailComponent,
        BuildingSerialsListComponent,
        BuildingEventsListComponent, */

        //Appartment
        AppartmentsListComponent,
        AppartmentComponent,
        //CupoHistoricComponent,
        //CupoInformationComponent,
        AppartmentComponentRegistry,
        FloorPipe
        
    ],
    providers: [
        DatePipe,

        //Building
        BuildingService,
        //BuildingsResolver,
        //BuildingDetailResolver,
        BuildingSharedService,

        //Appartment
        AppartmentService,
        AppartmentSharedService,

        //Product
        ProductService,

        //stepper
        CargasService,

        DatePipe,
        FloorPipe
    ]
})
export class ConsorcioModule {}
