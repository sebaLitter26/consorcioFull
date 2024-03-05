import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackBarService } from 'src/app/services/snackbar.service';
import { Appartment, AppartmentRegistry, AppartmentSelection } from '..';
import { first, map, Observable, of, Subscription, takeWhile } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-appartment-registry',
    templateUrl: './appartment-registry.component.html',
    styleUrls: ['./appartment-registry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppartmentComponentRegistry{

    /* @Input() disponibilidad: Disponibilidad[] = [];
    @Input() ocupacion: Ocupacion[] = []; */
    @Input() appartment?: Appartment;
    @Input() letter: any;
    @Input() updateSource: Observable<AppartmentSelection[]> = of([]);

    @Output() appartmentSelectedEvent: EventEmitter<AppartmentSelection> = new EventEmitter();

    //disponibilidad!: CupoSucursal;
    //ocupacion!: Ocupacion;

    //allBusy: boolean = false;
    currentBox!: AppartmentSelection;
    inFilter: boolean = false;

    //times: TimeRange[] = [];
    //busyTimes: TimeRange[] = [];
    
    private subscription$!: Subscription;

    formAppartmentGroup : FormGroup = new FormGroup({
        /** `FormControl` con el tipo de legajo a filtrar. */
        notesControl: new FormControl(''),
    });
    
    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private snackBarService: SnackBarService,
        private changeDetectorRef: ChangeDetectorRef,
        private fb: FormBuilder,
    ) {}

    

    ngOnInit(): void {

        //Validaciones especiales de acuerdo al perfil del usuario
        this.formAppartmentGroup.patchValue({
            notesControl: this.appartment?.observation
        });

        if (this.appartment && this.letter) {
            this.currentBox = {...this.appartment, selected: false   };  // hora: this.appartment.hora, dia: this.dia.compareDate,
          
            this.subscription$ = this.updateSource.subscribe((selectedCupos: AppartmentSelection[]) =>{
                
                const cupo_aux = selectedCupos.find(elem=> this.currentBox.floor == elem.floor && elem.letter == this.currentBox.letter);
                
                if(cupo_aux){
                    cupo_aux.selected = true;
                    this.currentBox = cupo_aux;
                }else
                    this.currentBox.selected= false;
                //this.changeDetectorRef.detectChanges();
            });
        }
    }

    getBackgroundColor(){
        let color = '';
        /* if(this.currentBox.error)
            color ='var(--color-unfit)' */
        if(this.currentBox?.selected)
            color ='var(--color-ok)'
        /*if(this.currentBox?.cupomaximonuevo != this.currentBox?.cupomaximo)
            color ='var(--color-accent)'
         else if(this.times?.some(e=> e.selected==true))
            color ='var(--color-accent)' */
        else if (this.inFilter)
            color ='var(--color-border)'
        return color;
    }

    /* openConfirmationDialog(title: string, message: string, color: "warn" | "accent" | "primary") {
        const confirmationDialogData: ConfirmationDialogData = {
            title: title,
            message: message,
            color: color,
            showObservation: true,
        }
        
        this.matDialog.open(ConfirmationDialogComponent, {
            width: "650px",
            data: confirmationDialogData
        }).afterClosed().subscribe((result: boolean | string) => {
            if (result) {
                this.closecupo(<string>result);
            }
        });
    } */

    closecupo($event: MouseEvent): void{
        $event.stopPropagation();
        this.appartmentSelectedEvent.emit(this.currentBox);
    }

    updateAppartmentDay($event?: MouseEvent){
        
        if(this.appartment){
            this.currentBox.selected = ($event) ? !this.currentBox.selected : true;
            let valor = this.formAppartmentGroup.controls.notesControl.value;
            valor = (!valor || valor<0) ? 0 : valor;

            /* let operation: string = (this.currentBox.cupomaximonuevo < valor) ? 'subir-cupo' : 'bajar-cupo';
            let allowModify = this.sucursalService.posible_operations.some(elem => elem.id == operation);
            if(!allowModify && ( operation == 'subir-cupo' && valor <= this.currentBox.cupomaximo || operation == 'bajar-cupo' && valor >= this.currentBox.cupomaximo )){
                allowModify = true;
            } 
            
            if(this.currentBox && allowModify) {
                this.currentBox.cupomaximonuevo = valor;
                this.currentBox.error = false;
                
                this.appartmentSelectedEvent.emit(this.currentBox);
            }else
                this.formAppartmentGroup.controls.notesControl.setValue(this.currentBox.cupomaximonuevo);
            //this.changeDetectorRef.detectChanges();
            */
        }
    }

    updateAppartmentForm(){
        const valor = this.formAppartmentGroup.controls.notesControl.value;
        if(valor && this.currentBox){
            //this.currentBox.cupomaximonuevo = valor;
            this.currentBox.selected = true;
            //this.currentBox.error = false;
            
            this.appartmentSelectedEvent.emit(this.currentBox);
        }
    }

    ngOnDestroy() {
        if(this.subscription$)
            this.subscription$.unsubscribe();
    }

}
