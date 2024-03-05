import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CargasService } from './services/cargas.service';

@Component({
    selector: 'app-cargas',
    templateUrl: './cargas.component.html',
    styleUrls: ['./cargas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargasComponent {

    constructor( public cargasService: CargasService) {}
    
}
