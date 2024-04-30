import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OverlayService } from '../../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicComponent, DynamicTableDefinition } from '../../../../ui/dynamic-table';
import { PluImageComponent } from '../../../../common/plu-image/plu-image.component';
import { StringSplitterData } from '../../../../common';
import { ProductService } from '../services/product.service';
import { Product } from '..';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductFormComponent } from './edit-product-form/create-product-form.component';
import { ProductActionsComponent } from './product-actions/product-actions.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit{

    /** `Subscription` de la consulta del reporte de novedades. */
    //actionsSubscription$?: Subscription; 

    
   /*  appartment$: Observable<Appartment[]> = this.recursosService.getAppartments(); 
    user$: Observable<User[]> = this.recursosService.getUsers();  */

    //products: Product[] = [];
    product$: Observable<Product[]> = this.productService.getProducts()

    today = new Date();
    loading: boolean = false;
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    


    /** La definición de la tabla que muestra el listado de novedades. */
    tableDefinition: DynamicTableDefinition = {
        displayedColumns: ["images", "name", "price", "stock", "brand", "description","updatedAt", "acciones"],
        headerCellDefinitions: ["", "Nombre", "Precio", "Stock", "Marca", "Descripción","Ultima actualización", "Acciones"],
    }

    /** Componentes custom a usar en el listado de novedades. */
    customComponents:  (DynamicComponent | null)[] = [
        {
            type: PluImageComponent,
            componentData: <StringSplitterData> {
                propertyPath: "images",
            },
            
        },

       null, null, null, null, null, null,
        //acciones de modificacion...
        {
            type: ProductActionsComponent,   
            componentData: <StringSplitterData>{
                propertyPath: '',
            },
        }
        
    ];

    /** Estilos custom para columnas del listado de novedades. */
    columnStyles: (((item: Product) => {[key: string]: string}) | null)[] = [
        null, null, null,
        /* (item: Product) => {
            const ProductTypeStyle: ProcessStateStyle = Product_MAP[item.ID_TIPO_NOVEDAD];
            
            return {
                "color": ProductTypeStyle.color,
                "padding": "5px 15px",
                "box-sizing": "border-box",
                "width": "110px",
                "border-radius": "5px",
                "background-color": ProductTypeStyle.backgroundColor,
            }
        },
        (item: Product) => {
            const ProductTypeStyle: ProcessStateStyle = PROCESS_STATES_MAP[item.ESTADO];

            return {
                "color": ProductTypeStyle.color,
                "padding": "5px 15px",
                "box-sizing": "border-box",
                "width": "100px",
                "border-radius": "5px",
                "background-color": ProductTypeStyle.backgroundColor,
            }
        }, null, null, null, null, null */
    ];

    /** Formatos custom para columnas del listado de novedades. */
    columnFormaters: (((item: Product) => string | number | boolean) | null)[] = [
        null, null,   
        (item: Product) => {
            return `${item.price} $`;
        },
        null, null,null,
        (item: Product) => {
            
            
            const date: Date = new Date(item?.updatedAt);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;
            
            return `${date+'' == "Invalid Date" ? item.updatedAt : formatedDate}`;
        },    
        /* (item: Product) => {
            return item.DESCRIPCION ?? '-';
        },
        (item: Product) => {
            let date = new Date(item.FECHA);
            return `${date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}` ?? '-';
        },
        (item: Product) => {
            return NOVELTIES_MAP[item.ID_TIPO_NOVEDAD].label;
        },
        (item: Product) => {
            return `${PROCESS_STATES_LABELS_MAP[item.ESTADO]}`;
        }, */
    ];

    productUpdateSource: Subject<boolean> = new Subject<boolean>();

    

    constructor(
        private overlayService: OverlayService,
        private changeDetectorRef: ChangeDetectorRef,
        private snackBarService: SnackBarService,
        private activatedRoute: ActivatedRoute, 
        public router: Router,
        private productService: ProductService, 
        private matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        /** Obtiene la lista de conteos precargada por el resolver */
        
        //this.updateTable();

        this.productService.updateProductEvent.subscribe((update: boolean) => {
            this.updateTable();
          });
    
        /* this.psicotecnico = this.activatedRoute.snapshot.queryParams as Psico;
        if(!this.psicotecnico.legajo){
            this.psicotecnico = undefined;
            return;
        }
        
        this.findLegajo(this.psicotecnico.legajo); */
        
    }

    openDialogCreateProduct(){
        this.matDialog.open(CreateProductFormComponent);
    }



    /* private _getFilters(): ProductFilters {
        return {
            tipoInquilino: null, //this.ProductFormFilter.controls.ProductTypeControl.value?.toString() ?? null,
            estado: null, //this.ProductFormFilter.controls.productStateControl.value?.toString() ?? null,
            fechaDesde: null, //this.ProductFormFilter.controls.dateFromControl.value,
            fechaHasta: null, //this.ProductFormFilter.controls.dateToControl.value,
            nroReserva: null, //this.ProductFormFilter.controls.nroReservaControl.value?.toString() ?? null,
            //idNovedad: this.ProductFormFilter.controls.ProductControl.value,
            limit: 10,
            page: 1
        };
    } */


    /**
     * Actualiza la tabla de novedades con los filtros indicados.
     */
    updateTable(): void {

        this.product$ = this.productService.getProducts();
       /*  return
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        this.actionsSubscription$ = this.productService.getProducts().subscribe({
            next: (result: Product[]) => {
                this.products = result;
                setTimeout(() => {
                    
                    this.overlayService.hideLoadingOverlay();
                    this.loading = false;
                    this.productUpdateSource.next(true);
                    this.changeDetectorRef.detectChanges();
                }, 100);
                
                if (this.products.length == 0) {
                    this.snackBarService.open("No se encontraron productos para los filtros ingresados", "Aceptar", 6000, "warning-snackbar");
                }
            },
            error: (error: HttpErrorResponse) => {
                this.products = [];
                
            },
        }); */
    }

   /*  ngOnDestroy(): void {
        this.actionsSubscription$?.unsubscribe();
    } */

}
