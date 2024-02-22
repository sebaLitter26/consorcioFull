import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/modules/main/services/profile.service';

@Component({
    selector: 'app-jwt-input',
    templateUrl: './jwt-input.component.html',
    styleUrls: ['./jwt-input.component.scss']
})
export class JwtInputComponent implements OnInit {

    /**
     * El `FormControl` del token ingresado.
     */
    tokenControl: FormControl = new FormControl();

    constructor(
        private profileService: ProfileService,
    ) { }

    ngOnInit(): void {
    }

    /**
     * Guarda el token ingresado en el perfil del usuario y en el `localstorage`.
     */
    saveToken(): void {
        //this.profileService.user.token = this.tokenControl.value;
        localStorage.setItem(environment.LOCAL_STORAGE_TOKEN, this.tokenControl.value);
    }
}
