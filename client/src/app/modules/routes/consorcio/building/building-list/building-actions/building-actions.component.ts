import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/modules/ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CustomCellComponent } from 'src/app/modules/ui/dynamic-table';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Building, BuildingAction } from '../..';
import { BuildingService } from '../../services/buildings.service';
import { BuildingState } from '../../model';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { CreateBuildingFormComponent } from '../edit-building-form/create-building-form.component';
import { CargasService } from '../../../cargas/services/cargas.service';

@Component({
  selector: 'app-building-actions',
  templateUrl: './building-actions.component.html',
  styleUrls: ['./building-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingActionsComponent implements CustomCellComponent, OnInit {
  /** Es asginada por la dynamic table */
  data: Building | null = null;

  /** Las acciones posibles que se pueden realizar de ese building segun su estado */
  actions: BuildingAction[] = [];
  constructor(
    private matDialog: MatDialog,
    private buildingService: BuildingService,
    private snackBarService: SnackBarService,
    private profileService: ProfileService,
    public cargasService: CargasService
  ) {}

  ngOnInit(): void {
    this.actions = this.getBuildingActions(this.data!.id); //.filter(action => this.userHasPermissionForAction(action))
  }

  /**
   * Realiza la accion clickeada en el menu de acciones del building y avisa para que se actualice la tabla
   * @param action La accion a realizar
   */
  handleAction(action: BuildingAction){
    
    switch(action.name)
    {

      case('appartments'):{

        this.cargasService.tabIndex = 1;
        this.buildingService.building = this.data;
        //this.router.navigate(['consorcio/cargas',{ outlets: { carga: [`appartment`] , {queryParams: {building: this.data} }}}] );

        /* const navigationExtras = { queryParams: {building: this.data?.id} };
        const commands = ['consorcio/cargas',
          {
            outlets: {
              carga: [`appartment`]
            },
          },
        ];
        this.router.navigate(commands, navigationExtras); */


        break;
      }
      case('detail'):{

        
        //this.router.navigate(['consorcio',{ outlets: { carga: [`appartment`] }, queryParams: {id: this.data?.id} }] );
        //this.router.navigate(['consorcio',{ outlets: { carga: [`building/building`] }}], {queryParams: {id: this.data?.id} } );
        break;
      }
      case('update'):{
        this.matDialog.open(CreateBuildingFormComponent,{
          data: this.data
        }).afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            /* this.buildingService.updateBuilding(this.data.).subscribe(() => {
              this.snackBarService.open(`Edificio ubicado en ${this.data!.address}, ${this.data!.location} fue creado satisfactoriamente.`, "Aceptar", 5000, "success-snackbar");
              this.BuildingSharedService.updateTable();
            }); */
          }
        })
        break;
        /* const confirmationDialogData: ConfirmationDialogData = {
          title: 'Modificar edificio',
          message: 'Esta seguro que desea modificar el edificio?',
          color: 'primary',
        }
        this.matDialog.open(ConfirmationDialogComponent, {
          width: "300px",
          data: confirmationDialogData
        }).afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            /* this.buildingService.updateBuilding(this.data.).subscribe(() => {
              this.snackBarService.open(`Edificio ubicado en ${this.data!.address}, ${this.data!.location} fue creado satisfactoriamente.`, "Aceptar", 5000, "success-snackbar");
              this.BuildingSharedService.updateTable();
            }); 
          }
        })
        break; */
      }
      
      case('delete'):{
        const title =  `ubicado en ${this.data?.address}, ${this.data?.location}`;
        
        const confirmationDialogData: ConfirmationDialogData = {
          title: 'Borrar edificio.',
          message: `Se borrara el edificio ${title}. ¿Desea continuar?`,
          color: 'primary',
        }
        this.matDialog.open(ConfirmationDialogComponent, {
          width: "300px",
          data: confirmationDialogData
        })
        .afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            this.buildingService.deleteBuilding(this.data!.id).subscribe(() => {
              this.snackBarService.open(`Edificio ${title} eliminado.`, "Aceptar", 5000, "success-snackbar");
              this.buildingService.updateTable();
            });
          }
        });
        break;
      }
      default:{}
    }
  }

  /**
   * Devuelve todas las acciones que se pueden realizar para un building
   */
  private getAllBuildingActions(): BuildingAction[]{
    const actions: BuildingAction[] = [
      
      {name: 'appartments', title: 'Departamentos', icon: 'info', permission: 'buildings_appartments', availableStates: []},
      {name: 'detail', title: 'Ver detalle', icon: 'info', permission: 'buildings_ver-detalle', availableStates: []},
      {name: 'update', title: 'Modificar edificio', icon: 'announcement', permission: 'buildings_informar-building',availableStates: [BuildingState.CREADO]},
      {name: 'delete', title: 'Borrar edificio', icon: 'cancel', color: '#F08080',  permission: 'buildings_cancelar-building',availableStates: []},
    ];
    return actions;
  }
  
  /**
   * Devuelve la lista de acciones que pueden realizarse para ese building
   * @param state 
   * @returns Una lista de acciones
   */
  getBuildingActions(id_building: string): BuildingAction[]{
    return this.getAllBuildingActions(); //.filter(a => a.availableStates?.length==0 || a.availableStates!.includes(state));
  }

  userHasPermissionForAction(action: BuildingAction): boolean {
    return action.permission ? this.profileService.hasPermission(action.permission) : true;
  }
}
