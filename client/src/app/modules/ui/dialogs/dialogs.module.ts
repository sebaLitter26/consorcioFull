import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { ImageDialogComponent } from "./image-dialog/image-dialog.component";

const components: Type<any>[] = [
    ConfirmationDialogComponent,
    ImageDialogComponent,
]

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: components,
    exports: components
})
export class DialogsModule {}