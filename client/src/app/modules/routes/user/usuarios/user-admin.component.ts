import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type} from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { OverlayService } from '../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { UserService } from '../services/user-service.service';
import {  User } from '..';
import {  DynamicComponent, DynamicTableDefinition } from '../../../ui/dynamic-table';
import { PluImageComponent } from '../../../common/plu-image/plu-image.component';
import { StringSplitterData } from '../../../common';
import { detailExpand, hoverExpand, inOutAnimation, rotate } from 'src/app/modules/routes/animations';


@Component({
    selector: 'app-user-admin',
    templateUrl:'./user-admin.component.html',
    styleUrls: ['./user-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [inOutAnimation]
})
export class UserAdminComponent{

    //empleado$: Observable<Empleado> | null = null;
    //sucursal$ : Observable<Sucursal[]> = this.recursosService.getSucursales();  
    //sector$: Observable<Sector[]> = this.recursosService.getSectores();
    /* GProf$ : Observable<Nomina[]> = this.recursosService.getEmpleadoByLegajo(128346); */
   /*  tipoDocumentos: string[] = [
        'D.N.I.',
        'C.I.',
        'L.C.'
    ];

    resultados: string[] = [
        'Apto',
        'No apto',
        'Apto +',
        'Sin resultado'
    ]; */

    
    tableUpdateSource: Subject<boolean> = new Subject<boolean>();

    /** Definicion de las columnas del listado del control seleccionado. Puede ser Control de retorno o tecnico o comercial */
    tableDefinition: DynamicTableDefinition = {
        displayedColumns: [
            'id',
            'habilitado',
            'name',
            'email',
            'phone',
            'picture',
            'appartment',
            'updatedAt',
            'createdAt',
            'rol',

        ],
        headerCellDefinitions: [
            'ID',
            'HABILITADO',
            'NOMBRE',
            'EMAIL',
            'TELEFONO',
            'FOTO',
            'DEPARTAMENTO',
            'F ACTUALIZACIÓN',
            'F ALTA',
            'ROL',
        ],
    }

    /** Componentes custom para listado del psicotecnicos.  */
    customColumnComponents: (DynamicComponent | null)[] = [
        null, null, null, null, null, 
        {
            type: PluImageComponent,
            componentData: <StringSplitterData>{
                propertyPath: 'picture',
            },
        },
         
    ];


    /** Formatos custom para columnas del listado de control seleccionado. */
    columnFormaters: (((control: User) => string | number | boolean) | null)[] = [
        null,
        (user: User) => {
            return `${user.isActive ? '' : 'in'}habilitado`;
        }, 
        null, null,null, null,
        (user: User) => {
            return `${user.appartment ? (user.appartment.floor>0 ? user.appartment.floor : 'PB') +' - ' +user.appartment.letter  : 'Sin asignar'}`;
        },
        (user: User) => {
            const date: Date = new Date(user?.updatedAt);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;
            
            return `${date+'' == "Invalid Date" ? user.updatedAt : formatedDate}`;
        },
        (user: User) => {
            const date: Date = new Date(+user?.createdAt);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;

            return `${formatedDate == "Invalid Date" ? user.createdAt : formatedDate}`;
        },null,
        /* (user: User) => {
            return `${user.rol ? '' : 'no '}tiene`;
        } */
        
    ];

    listUsers: User[] = [];


    today = new Date();
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    selectedSucursal: number = 1;

    formUserListGroup = this.fb.group({
        /** `FormControl` con el tipo de legajo a filtrar. */
        legajoControl: ['' , [Validators.required]],

        sectorControl: ['' , [Validators.required]],
        /** `FormControl` con la sucursal. */
        sucursalControl: ['',[Validators.required]],
        /** `FormControl` las fechas de la fecha. */
        fechaControl: [this.today],
        /** `FormControl` con el puesto a ocupar. */
        puestoControl: [''],
        /** `FormControl` con la postula. */
        postulaControl: [''],
        /** `FormControl` con el resultado. */
        resultadoControl: [ '',[Validators.required]],

        psicologoControl: ['',[Validators.required]],

        bateriaTextControl: [''],

        verazControl: [false],

        nombreControl: ['',[Validators.required]],
        tipoDocumentoControl: ['D.N.I.',[Validators.required]],
        documentoControl: ['',[Validators.required]],

        observacionesControl: ['',[Validators.required]],
        activoControl: [false],
      });


    loading: boolean = false;


    constructor(
        public userService: UserService,
        private overlayService: OverlayService,
        private fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private snackBarService: SnackBarService,
    ) {
        this.searchUser();
    }

    searchUser() : void {

        /* const formList = this.formUserListGroup.controls;

        const filters: FormUser = {
            legajo: formList.legajoControl.value,
            sector: `${formList.sectorControl.value}`,
            sucursalsolicitante: `${formList.sucursalControl.value}`,
            fecha: formList.fechaControl.value,
            puestopostulado: formList.puestoControl.value ?? '',
            postula: formList.postulaControl.value ?? '',
            result: formList.resultadoControl.value,
            psicologo: formList.psicologoControl.value,
            bateriatests: formList.bateriaTextControl.value ?? '',
            tieneveraz: formList.verazControl.value ?? false,
            observaciones: formList.observacionesControl.value,
            activo: formList.activoControl.value ?? false,
            apellidonombre: formList.nombreControl.value,
            cargo: '',
            refpsico: false,
            gr_prof: '',
            doc_tipo: formList.tipoDocumentoControl.value,
            doc_nro: formList.documentoControl.value,
            idcarga: this.today.toISOString(),
            nombreusuario: '',
            nombreequipo: '', 
            tab: '',
        } */

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        
        this.userService.getUsers().subscribe((data: User[]) => {
            //this.snackBarService.open(`Se registraron los cambios de ${data.apellido_nombre}`, "Aceptar", 6000, "success-snackbar");
            this.listUsers = data;
            setTimeout(() =>{
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
                this.changeDetectorRef.detectChanges();
            }, 100);

        });
    }

   /*  findLegajo(legajo: number){
        if (!legajo ) return;
        
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        this.empleado$ = this.recursosService.getEmpleadoByLegajo(legajo);
        this.updateForm();
        
    } 

    updateForm(){
        if(this.tabIndex>0 || !this.empleado$){
            this.formRenditionListGroup.reset();
            return;
        }

        

        this.empleado$?.subscribe((trabajador: Empleado) => {  
            
            this.selectedSucursal = +trabajador.subdivision;
            
            this.formRenditionListGroup.patchValue({
                legajoControl: `${+trabajador.legajo}`,
                nombreControl: trabajador.nombre,
                documentoControl: trabajador.nrodocumento,
                tipoDocumentoControl: this.tipoDocumentos[+trabajador.tipodocumento-1],
                puestoControl : trabajador.funciondescripcion,
                sectorControl: trabajador.sector,
                fechaControl: new Date(this.today),
            });
            this.overlayService.hideLoadingOverlay();
            this.loading = false;
            this.changeDetectorRef.detectChanges();

            
        });

        
    }
    */
}
