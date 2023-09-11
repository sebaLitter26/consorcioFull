import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { Empleado, IPadService } from 'src/app/services/ipad.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {

    /** El Perfil del usuario a mostrar. */
    //empleado$: Observable<Empleado[]>;

    constructor(private ipadService: IPadService, private profileService: ProfileService) {
        /* this.empleado$ = this.ipadService.getEmployee(+this.profileService.user.mail).pipe(
            map((empleados:any) => {
                //if(!empleados.Empleado || empleados.listaEmpleados < 1) return [];
                for (const emp of Object.keys(empleados.listaEmpleados[0]) as Array<keyof typeof empleados.listaEmpleados[0]>) {
                    if (typeof (empleados.listaEmpleados[0][emp]) == 'string') {

                        // Como las fechas vienen un formato especial brindado por Microsoft, hacemos esta conversión para que pueda ser comprendido con naturalidad.
                        if (empleados.listaEmpleados[0][emp].includes('Date')) {
                            empleados.listaEmpleados[0][emp] = new Date(parseInt(empleados.listaEmpleados[0][emp].substr(6))).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                        }
                    }

                }
                return empleados.listaEmpleados;
            })
        ) */
    }

}
