import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CartService } from '../services/cart.service'
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { OverlayService } from '../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Order, Product, ResolvedData } from '..';
import { inOutAnimation } from 'src/app/modules/routes/animations';
import { Appartment } from '../../consorcio/appartments';
import { FloorPipe } from '../../../ui/cool-file-input/pipes/floor.pipe';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    providers: [
        {
          provide: STEPPER_GLOBAL_OPTIONS,
          useValue: {showError: true},
        },
      ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [inOutAnimation]
})
export class ProductListComponent implements OnInit{

    cartFormGroup = this.fb.group({
        cartCtrl : [<Product[]>[], [Validators.required, Validators.minLength(3)] ],
    });
    
    contactFormGroup = this.fb.group({
        
        phoneCtrl: ['', Validators.required],
        floorCtrl: [0, Validators.required],
        deptoCtrl: ['' , Validators.required],
        buildingCtrl: ['', Validators.required],

        appartmentCtrl: ['', Validators.required],
        observacionesControl: [''],
        //fechaControl: [this.today],
    });

    //building$ : Observable<Building[]> = this.cartService.getBuildings();  
    /* pisosEdificio: number[] = [];
    deptosEdificio: string[] = []; */

    today = new Date();
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();
    
    resolvedData: ResolvedData = this.activatedRoute.snapshot.data.cartDetail as ResolvedData;


    appartments: Appartment[] = [];

    order?: Order;
    loading: boolean = false;

    constructor(
        public cartService: CartService,
        private overlayService: OverlayService,
        private fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private snackBarService: SnackBarService,
        private activatedRoute: ActivatedRoute, 
        public router: Router,
        private profileService: ProfileService, 
       
    ) {}

    ngOnInit(): void {

        const user = this.profileService.user;
        if(!user) return;
        this.contactFormGroup.patchValue({
            phoneCtrl: user?.phone, 
            /* floorCtrl: user?.appartment?.floor,
            deptoCtrl: user?.appartment?.letter, */
            buildingCtrl: user?.appartment?.buildingId,
            appartmentCtrl: user?.appartment?.id
        });

        console.log(user);
        
        
        /** Obtiene la lista de conteos precargada por el resolver */
        //this.loading = true;
        //const bui = this.resolvedData.buildings.find(e => e.id == this.user.appartment?.buildingId )

        //this.contactFormGroup.controls.buildingCtrl.setValue(this.user.appartment?.buildingId ?? '')
        
        /* if(!this.identification.building){
            this.identification = undefined;
            return;
        }
        this.findUser(this.identification.phone); 
        {
            type: PluImageComponent,
            componentData: <StringSplitterData> {
                propertyPath: "images",
            },
            
        },
        */
        
        
    }


    products: Product[] = [...this.resolvedData.products];
    cart: Product[] = [];
    
    drop(event: CdkDragDrop<Product[]> ) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }

        this.cartFormGroup.controls.cartCtrl.setValue(this.cart)
        
    }

    displayBuildingSelect = (buildingId: string) => {
        const edificio = this.resolvedData.buildings.find(e => e.id == buildingId )
        if(!edificio) return '';

        /* const pisos: number[] = [0,1,2,3,4,5,6,7,8,9];
        this.pisosEdificio = pisos.slice(0, pisos.indexOf(edificio.floors)+1)

        const deptos: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.deptosEdificio = deptos.slice(0, deptos.indexOf(edificio.letter)+1) */

        this.appartments = edificio.appartments;
        
        return `${edificio.address + ' - '+  edificio.location}`
    }

    displayAppartmentSelect = (appartmentId: string) => {

        const appartment = this.appartments.find(e => e.id == appartmentId )
        if(!appartment)  return 'Seleccione depto';
        return `${ new FloorPipe().transform(appartment?.floor) } - ${appartment?.letter}`
    }


    /* findAppartment(): string {

        const formContact = this.contactFormGroup.controls;


        const appartments = this.resolvedData.buildings.find(building => building.id == formContact.buildingCtrl.value)?.appartments;
        const appartment = appartments?.find(appartment => appartment.floor == formContact.floorCtrl.value && appartment.letter == formContact.deptoCtrl.value);

        console.log(formContact.floorCtrl.value, formContact.deptoCtrl.value, appartments);

        return appartment?.id ?? '';

    } */


    confirmCart(){
        const formCart = this.cartFormGroup.controls;
        const formContact = this.contactFormGroup.controls;

        const filters: Order = {
            //cart: this.cart.map((product) =>{ return { productId: product.id, price: product.price, quantity: 1 }}),
            phone: formContact.phoneCtrl.value ?? undefined,
            observation: formContact.observacionesControl.value ?? '',
            appartmentId: formContact.appartmentCtrl.value ?? '',
            //userId: this.profileService.user.id ?? '',

            //id: this.order?.id ?? 0,
        }
       

        console.log(filters);
        

        //if (!filters.legajo ) return;
       //this.overlayService.displayLoadingOverlay();
        this.loading = true;

        this.cartService.createOrder(filters).subscribe((data: Order) => {
            
            this.snackBarService.open(`Se registro la compra.`, "Aceptar", 6000, "success-snackbar");
            console.log("order", data);
            
            //this.empleado = data.Data;
            //setTimeout(() =>{
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
            //}, 100);

        });

    }


    modifyOrder() : void {
      
        //const formList = this.cartFormGroup.controls;

        /* const filters: Order = {
            cart: this.cart,
            building: 'dnsdnoe',
            depto:'B',
            floor:1,
            phone:1165404122,
            observaciones: '',
            
            id: this.order?.id ?? 0,
        }

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        this.cartService.createOrder(filters).subscribe((data: Order) => {
            this.snackBarService.open(`Se registro la compra.`, "Aceptar", 6000, "success-snackbar");
            //this.empleado = data.Data;
            setTimeout(() =>{
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
            }, 100);

        }); */
    }

    /**
     * Callback a utilizar en el input de lectura de Legajo, y que se ejecuta luego de presionar enter.
     *
     * Se encarga de consultar los datos del Empleado.
     */
    /* readLegajoOnKeyDownCallback: ((keyboardEvent: KeyboardEvent) => void) = (event: KeyboardEvent) => {
        const legajoInput = this.formRenditionListGroup.controls.legajoControl;
        
        if (typeof legajoInput.value == 'string' && event.key == "Enter") {
            this.findUser(+legajoInput.value);
        }
    }; */

 

    findUser(phone: number){
        if (!phone ) return;
        
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        
    }


    
}
