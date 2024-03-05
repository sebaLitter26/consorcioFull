
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/modules/ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CustomCellComponent } from 'src/app/modules/ui/dynamic-table';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Product, ProductAction } from '../..';
import { ProductState } from '../../model';
import { CreateProductFormComponent } from '../edit-product-form/create-product-form.component';
import { CargasService } from '../../../cargas/services/cargas.service';
import { ProfileService } from '../../../../../main/services/profile.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductActionsComponent implements CustomCellComponent, OnInit {
  /** Es asginada por la dynamic table */
  data: Product | null = null;

  /** Las acciones posibles que se pueden realizar de ese product segun su estado */
  actions: ProductAction[] = [];
  constructor(
    private matDialog: MatDialog,
    private productService: ProductService,
    private snackBarService: SnackBarService,
    private profileService: ProfileService,
    public cargasService: CargasService
  ) {}

  ngOnInit(): void {
    this.actions = this.getProductActions(this.data!.id); //.filter(action => this.userHasPermissionForAction(action))
  }

  /**
   * Realiza la accion clickeada en el menu de acciones del product y avisa para que se actualice la tabla
   * @param action La accion a realizar
   */
  handleAction(action: ProductAction){
    
    switch(action.name)
    {
      case('update'):{
        this.matDialog.open(CreateProductFormComponent,{
          data: this.data
        }).afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            /* this.productService.updateproduct(this.data.).subscribe(() => {
              this.snackBarService.open(`producto ubicado en ${this.data!.address}, ${this.data!.location} fue creado satisfactoriamente.`, "Aceptar", 5000, "success-snackbar");
              this.productSharedService.updateTable();
            }); */
          }
        })
        break;
        /* const confirmationDialogData: ConfirmationDialogData = {
          title: 'Modificar producto',
          message: 'Esta seguro que desea modificar el producto?',
          color: 'primary',
        }
        this.matDialog.open(ConfirmationDialogComponent, {
          width: "300px",
          data: confirmationDialogData
        }).afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            /* this.productService.updateproduct(this.data.).subscribe(() => {
              this.snackBarService.open(`producto ubicado en ${this.data!.address}, ${this.data!.location} fue creado satisfactoriamente.`, "Aceptar", 5000, "success-snackbar");
              this.productSharedService.updateTable();
            }); 
          }
        })
        break; */
      }
      
      case('delete'):{
        const title =  `${this.data?.name}, ${this.data?.brand}`;
        
        const confirmationDialogData: ConfirmationDialogData = {
          title: 'Borrar producto.',
          message: `Se borrara el producto ${title}. ¿Desea continuar?`,
          color: 'primary',
        }
        this.matDialog.open(ConfirmationDialogComponent, {
          width: "300px",
          data: confirmationDialogData
        })
        .afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            this.productService.deleteProduct(this.data!.id).subscribe(() => {
              this.snackBarService.open(`Producto ${title} eliminado.`, "Aceptar", 5000, "success-snackbar");
              this.productService.updateTable();
            });
          }
        });
        break;
      }
      default:{}
    }
  }

  /**
   * Devuelve todas las acciones que se pueden realizar para un product
   */
  private getAllProductActions(): ProductAction[]{
    const actions: ProductAction[] = [
      
      //{name: 'appartments', title: 'Departamentos', icon: 'info', permission: 'products_appartments', availableStates: []},
      //{name: 'detail', title: 'Ver detalle', icon: 'info', permission: 'products_ver-detalle', availableStates: []},
      {name: 'update', title: 'Modificar producto', icon: 'announcement', permission: 'products_informar-product', availableStates: [ProductState.CREADO]},
      {name: 'delete', title: 'Borrar producto', icon: 'cancel', color: '#F08080',  permission: 'products_cancelar-product',availableStates: []},
    ];
    return actions;
  }
  
  /**
   * Devuelve la lista de acciones que pueden realizarse para ese product
   * @param state 
   * @returns Una lista de acciones
   */
  getProductActions(id_product: string): ProductAction[]{
    return this.getAllProductActions(); //.filter(a => a.availableStates?.length==0 || a.availableStates!.includes(state));
  }

  userHasPermissionForAction(action: ProductAction): boolean {
    return action.permission ? this.profileService.hasPermission(action.permission) : true;
  }
}
