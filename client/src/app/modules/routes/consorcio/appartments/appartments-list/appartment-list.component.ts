
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Appartment, BuildingListFilters, AppartmentSelection } from '..';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../../ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlayService } from '../../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { finalize, take } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArrayUtils } from 'src/app/utils/array.utils';
import { AppartmentService } from '../services/appartment.service';
import { Building } from '../../building';
import { BuildingService } from '../../building/services/buildings.service';


/* const day_format = (miliseconds: string) => [miliseconds.slice(0, 4), '-', miliseconds.slice(4,6), '-',miliseconds.slice(6,8)].join('');

class ColumnDay {
    
    current: Date;
    followingDay: number;
    followingDate: Date;
    formatDate: string;
    compareDate: number;

    constructor(days: number = 1, miliseconds: string) {

        //const day_format = [miliseconds.slice(0, 4), '-', miliseconds.slice(4,6), '-',miliseconds.slice(6,8)].join('');
        
        
        
        this.current = new Date(day_format(miliseconds));
        
        this.followingDay = this.current.getTime()  +  86400000;
        this.followingDate = new Date(this.followingDay);
        this.formatDate = `${this.getDay()}/${this.getMonth()}`;
        this.compareDate = +`${this.followingDate.getFullYear()}${this.getMonth()}${this.getDay()}`; //2022-04-25
    }

    getMonth() {
        return (this.followingDate.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }

    getDay() {
        return (this.followingDate.getDate()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }
} */

@Component({
    selector: 'app-appartment-list',
    templateUrl: './appartment-list.component.html',
    styleUrls: ['./appartment-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppartmentsListComponent implements OnInit {

    LETTERS_APPARTMENT: string[] =['A','B','C','D','E','F'];

    deptoUpdateEvent: Subject<AppartmentSelection[]> = new Subject<AppartmentSelection[]>();

    /** Los andenes actuales. */
    appartments: Appartment[][] = [];

    /* patterns = {
        '0': { pattern: new RegExp(/[0-2]/) },
        '1': { pattern: new RegExp(/[0-9]/) },
        '2': { pattern: new RegExp(/[0-5]/) }
      }; */

      buildingFormGroup: FormGroup = new FormGroup({
        /* horaHastaControl : [<string>'', Validators.required],
        horaDesdeControl : [<string>'', Validators.required], */
        buildingControl: new FormControl( '', Validators.required),
    });

    appartments_error: number[] = [];

    //selectedHours = new FormControl([9,13,18]);
    /** Andenes seleccionados para su preparación */
    selectedAppartments: AppartmentSelection[] = [];

    loading: boolean = false;

    //week: ColumnDay[] = [];

    //horasList: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

    building$ : Observable<Building[]> | null = null;
    
    /* options_time_desde: string[] = [];
    options_time_hasta: string[] = []; */
    filteredOptions?: Observable<string[]>;

    constructor(
        private matDialog: MatDialog,
        private appartmentService: AppartmentService,
        private overlayService: OverlayService,
        private snackBarService: SnackBarService,
        private changeDetectorRef: ChangeDetectorRef,
        //private activatedRoute: ActivatedRoute, 
        public buildingService: BuildingService,
        
    ) {}

    ngOnInit(){
        
        const edificio = this.buildingService.building ?? this.buildingService.buildings[0];
        this.displayTable(edificio);

    }


    displayTable(building: Building | null){
        if(!building) return;
        this.buildingFormGroup.controls.buildingControl.setValue(building.id);
        this.LETTERS_APPARTMENT = this.LETTERS_APPARTMENT.slice(0,this.LETTERS_APPARTMENT.indexOf(building.letter)+1)
                    
        this.appartments = [];
        let floor = 0;  // check if there are appartments in PB else floor = 1  -   (result.floors >= floor)
        while(building.floors > floor){
            
            this.appartments.push(building.appartments.filter(e=> e.floor == floor) );
            floor++;
        }
        
        /* let arr = result.data.building.appartments;
    arr.forEach((elem: Appartment)=> elem.forEach((cupo,i, arr2)=> {
        //const cupo1 = {...cupo, cupomaximonuevo : cupo.cupomaximo, error : errors.includes(cupo.idhorariosentregacuposfecha) }
        arr2[i]= cupo1;
    }))
    return arr; 
        
        this.week= [];
        for (let i= 0; i < this.LETTERS_APPARTMENT; i++) {
            
            this.week.push(new ColumnDay(i,`${this.cupos[0][i].letter}`));
        }
        
        /* .sort((a, b) => {
            if (a.hora < b.hora) return -1;
            if (a.hora > b.hora) return 1;
            return 0;
        }); */
        this.deptoUpdateEvent.next(this.selectedAppartments);
        this.selectedAppartments = [];
        this.changeDetectorRef.detectChanges();
    }


    // Cargo los filtros correspondientes a la columna
    /* fillFilterValues(field: string = ''){
        const arr_hours = (field == 'hora_desde') ? this.options_time_desde: this.options_time_hasta;  
        this.filteredOptions =  of(arr_hours);

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BuildingDetail> {
        return this.buildingService.getBuildingDetails(route.queryParams.id);
        
    } */

    /* onSelectedTime(){
        if(this.sucursalFormGroup.valid){
            this.sucursalService.horaDesde = this.sucursalFormGroup.controls.horaDesdeControl.value ?? '';
            this.sucursalService.horaHasta = this.sucursalFormGroup.controls.horaHastaControl.value ?? '';
            
            //this.cupoUpdateEvent.next(this.selectedAppartments);
        }

        By floor-> [
            By letter-> [{
                id,
                floor,
                letter,
                owner,
                tenant
                observation

            }]
        ]
  
    } */
    

    /**
     * Actualiza la tabla de CUPOS con los filtros indicados.
     */
    getAppartments(errors: number[] = []): void {

        if(this.buildingFormGroup.invalid) return;
        //this.sucursalService.horaDesde = this.sucursalFormGroup.controls.horaDesdeControl.value ?? '';
        
        const building: BuildingListFilters = {buildingId: this.buildingFormGroup.controls.buildingControl.value}

        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        this.appartmentService.getAppartments(building).pipe(
            take(1),
            finalize(() => {
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
            })
            ).subscribe({
            next: (result: Building) => {
                this.loading = false;
                
                
                if (result.appartments.length == 0){
                    this.snackBarService.open("No se encontraron departamentos para el edificio seleccionado", "Aceptar", 6000, "warning-snackbar");
                   
                }else{
                    this.LETTERS_APPARTMENT = this.LETTERS_APPARTMENT.slice(0,this.LETTERS_APPARTMENT.indexOf(result.letter)+1)
                    
                    this.appartments = [];
                    let floor = 0;  // check if there are appartments in PB else floor = 1  -   (result.floors >= floor)
                    while(result.floors > floor){
                        
                        this.appartments.push(result.appartments.filter(e=> e.floor == floor) );
                        floor++;
                    }
                   
                    /* let arr = result.data.building.appartments;
                arr.forEach((elem: Appartment)=> elem.forEach((cupo,i, arr2)=> {
                    //const cupo1 = {...cupo, cupomaximonuevo : cupo.cupomaximo, error : errors.includes(cupo.idhorariosentregacuposfecha) }
                    arr2[i]= cupo1;
                }))
                return arr; 
                    
                    this.week= [];
                    for (let i= 0; i < this.LETTERS_APPARTMENT; i++) {
                        
                        this.week.push(new ColumnDay(i,`${this.cupos[0][i].letter}`));
                    }
                    
                    /* .sort((a, b) => {
                        if (a.hora < b.hora) return -1;
                        if (a.hora > b.hora) return 1;
                        return 0;
                    }); */
                    this.deptoUpdateEvent.next(this.selectedAppartments);
                    this.selectedAppartments = [];
                    this.changeDetectorRef.detectChanges();
                }
            },
            error: (e) => {
                this.appartments = [];
                console.error(e);
            }
        });
    }

    _allAppartmentRowsSelected = (pos: number) => {
        
        if(!this.appartments) return false;
        //const hora = this.cupos[pos][0].hora ;
        return true;
        //return this.selectedAppartments.filter(elem=> elem.hora == pos).length >= this.LETTERS_APPARTMENT;
        //return this.selectedAppartments.filter(elem=> elem.hora == hora).length >= (this.CANT_DAYS_WEEK- (this.sucursalService.disponibilidad[hora] ?? []).length);
        //const abailable: Disponibilidad[] = this.disponibilidad[hora];
        //const busy: Ocupacion[] = this.cupos?.ocupacion[hora] ?? [];
        //return (!abailable) ? false : abailable.every((dispo: Disponibilidad) => dispo.fecha <= this.week[this.CANT_DAYS_WEEK-1].compareDate && this.selectedAppartments.includes(dispo) && !busy.find(disable=> disable.fecha===dispo.fecha)) 
        
    };

    _allLetterColumnSelected = (letter: number) : boolean => {
        if(!this.appartments) return false;
        return true;
        //return this.selectedAppartments.filter(elem=> elem.letter === letter).length >= 23;
        /* const cant_Cupos = this.cupos.length;
        let i = cant_Cupos-1;
        let allSelected: boolean = true;
        const selectedByDay = this.selectedAppartments.filter(e=> e.dia == day); */
        /* do {
            const cupo = this.cupos[i];
            const dispo = (this.sucursalService.disponibilidad[cupo.hora] ?? []).find((e: Disponibilidad)=> e.fecha == day)
            if( !dispo)   // cupo.enabled==1 &&     (this.sucursalService.disponibilidad[this.currentBox.hora] ?? []).find((e: Disponibilidad)=> e.fecha == this.currentBox.fecha)
                allSelected = selectedByDay.findIndex(selected=> selected.hora == cupo.hora) > -1;
                //&&  selected.fecha <= this.week[this.CANT_DAYS_WEEK-1].compareDate && selected.fecha >= this.week[0].compareDate
            i--;
        } while(i>=0 && allSelected); */
        
        //return allSelected ?? false;
    };


    handleDeptoSelected(dispo: any){
        
        if(dispo) {
            /* if(dispo.selected && dispo.cupomaximo !== dispo.cupomaximonuevo){
                this.selectedAppartments.push(dispo);
            }else */
                this.selectedAppartments = this.selectedAppartments.filter(cupo => !(cupo.floor == dispo.floor && cupo.letter === dispo.letter));  // && !busy.includes(selected)
            this.deptoUpdateEvent.next(this.selectedAppartments);
            this.changeDetectorRef.detectChanges();
        }
    }

    /* availableColumRow(day:string){
        if(!this.cupos?.andenes) return false;
        let available: boolean = false;
        let i = this.cupos?.andenes.length-1;
        do {
            const cupo = this.cupos?.andenes[i];
            available = cupo.enabled == 1; // && this.cupos?.disponibilidad[cupo.hora] && (this.cupos?.disponibilidad[cupo.hora]?.findIndex((dispo: Disponibilidad)=> dispo && dispo.fecha == day) > -1);
            i--;
        } while(i>=0 && !available);
        return available;
    } */

    updateDateColumns(event:MatCheckboxChange, day: number){
        if(!event.checked){
            this.selectedAppartments = ArrayUtils.removeDuplicate(this.selectedAppartments,'floor','letter',day);
            //this.selectedAppartments = this.selectedAppartments.filter(elem=> elem.dia != day);
             //filter(seleccionado=> seleccionado.fecha != day);
        } else{
            //let aux: AppartmentSelection[] = [];
            
            
            let selected: AppartmentSelection[] = [];
            //this.cupos.map((elem)=>selected.push(...elem.filter(elem=> elem.dia == day)));
            
            /* this.cupos.forEach((cupo:CupoSucursal) =>{
                //const abailable = this.cupos?.disponibilidad[cupo.hora];
                //const busy: Ocupacion[] = this.cupos?.ocupacion[cupo.hora] ?? [];
               if(event.checked)  //cupo.enabled &&
                    selected.push({...cupo, dia:day});
            }); */
            this.selectedAppartments.push(...selected);
        }
        
        //console.log(day, this.selectedAppartments);
        this.deptoUpdateEvent.next(this.selectedAppartments);
        
        this.changeDetectorRef.detectChanges();
    }

    updateDeptoRows(event:MatCheckboxChange, pos: number) {
        
        /* if(!event.checked)
            this.selectedAppartments = ArrayUtils.removeDuplicate(this.selectedAppartments,'hora','dia', this.cupos[pos][0].hora)  //.filter(e=> e.hora != hora);
        else
            this.selectedAppartments.push(...this.cupos[pos]); */
        this.deptoUpdateEvent.next(this.selectedAppartments);
        this.changeDetectorRef.detectChanges();
    }


    
    openConfirmationDialog(){
        if(this.buildingFormGroup.invalid || this.selectedAppartments.length < 1) return;
        //let updatedCupos: AppartmentSelection[] = this.selectedAppartments.filter(elem => elem.cupomaximonuevo !== elem.cupomaximo );
        //updatedCupos = ArrayUtils.unique(updatedCupos,'idhorariosentregacuposfecha');
        
        let cupos = '';
        this.selectedAppartments.sort((a, b) => {
            if (a.floor! < b.floor!) return -1;
            if (a.floor! > b.floor!) return 1;
            return 0;
        }).forEach(e=> cupos +=`<br>${e.floor} ${e.letter}) - Edificio: ${e.building.address} -  ${e.building.location}`);
        const confirmationDialogData: ConfirmationDialogData = {
            title: `Modificar departamento`,
            message: `Esta seguro de que desea modificar los siguientes departamentos? ${cupos}`,
            color: 'accent',
            //showObservation: true,
        }
        
        let matDialogRef: MatDialogRef<ConfirmationDialogComponent> = this.matDialog.open(ConfirmationDialogComponent, {
            width: "650px",
            data: confirmationDialogData
        });
        
        matDialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean | string) => {
            
            if (result) {
                this.overlayService.displayLoadingOverlay();
                this.loading = true;
                //const fn =() => (this.disponibilizar) ?  this.sucursalService.updateCupoCalendar : this.sucursalService.reserveCupo
                /* this.appartmentService.updateSucursalesCupos(updatedCupos)
                .pipe(take(1))
                .subscribe({
                    next: (result: UpdateResponse) => {
                        
                        let msg = 'No se registraron cambios para los cupos seleccionados';
                        if (result) {
                            this.getCuposSucursal(result.error);
                            msg = `Se modificaron correctamente los cupos: ${result.ok.join(', ')}`;
                        }
                        this.snackBarService.open(msg, "Aceptar", 6000, "success-snackbar");
                    },
                    error: (e: HttpErrorResponse) => console.error(e),
                    complete: () => {
                        this.overlayService.hideLoadingOverlay();
                        this.loading = false;
                    }
                }); */
            }
        });
    }
    
}

