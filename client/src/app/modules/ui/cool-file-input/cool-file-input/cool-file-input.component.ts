import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoolFile, Cloudinary } from '..';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { IsImagePipe } from '../pipes/is-image.pipe';
import { SnackBarService } from '../../../../services/snackbar.service';
import { UploadService } from '../cool-file-input.service';


@Component({
    selector: 'app-cool-file-input',
    templateUrl: './cool-file-input.component.html',
    styleUrls: ['./cool-file-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoolFileInputComponent implements OnInit {
    
    /** El alto del componente. */
    @Input()
    height: string = "300px";

    /** El tamaño máximo del total de archivos permitido, en bytes. */
    @Input()
    maxTotalSize: number | null = null;

    /** Flag que indica si se debe mostar el input para subir archivos. */
    @Input()
    showFilesInput: boolean = true;

    /** Flag que indica si se debe mostrar el listado de archivos subidos. */
    @Input()
    showFilesList: boolean = true;

    /** Flag que indica si se debe permitir quitar archivos de la lista. */
    @Input()
    allowFilesRemoval: boolean = true;

    /** Array que indica que extenciones de archivos son permitidos en la lista. 
     * format -> ".jpg,.jpeg,.png,.txt,.doc,.docx";
    */
    @Input()
    allowFilesExtensions: string = '';

    /** Numero que indica que tamaño de archivos son permitidos en la lista en bits. */
    @Input()
    allowMaxFileSize: number = 2000000; //2MB

    @Output()
    finalizaCarga = new EventEmitter<CoolFile[]>();

    files: CoolFile[] = [];

    @Input()
    initialFiles: string[] = [];

    constructor(
        private isImagePipe: IsImagePipe,
        private fileSizePipe: FileSizePipe,
        private changeDetectorRef: ChangeDetectorRef,
        private snackBarService: SnackBarService,
        private uploadService: UploadService
    ) {
        
    }

    ngOnInit(): void {
        this.initialFiles.forEach(elem=>{
            
            const arch = JSON.parse(elem) as Cloudinary;
            const coolFile: CoolFile = {
                src: new Blob([arch.secure_url]),
                name: arch.asset_id,
                type: arch.resource_type,
                extension: arch.secure_url.substring(arch.secure_url.lastIndexOf("."), arch.secure_url.length),
                progress: 100,
                size: arch.bytes,
                loaded: arch.bytes,
                cloudinary: arch
            }
            this.files.push(coolFile);
            
        })
    }

    /**
     * Elimina un archivo del array de archivos.
     * @param index la posición del archivo dentro del array de archivos
     */
    removeFile(index: number): void {
        if(!this.files[index].cloudinary) return;
        this.uploadService.deleteFile(this.files[index].cloudinary!).subscribe(elem=>{
            this.files.splice(index, 1);
            this.finalizaCarga.emit(this.files);
            if(elem.result!="ok"){
                this.snackBarService.open(`${elem.result}.`, "Aceptar", 5000, "error-snackbar");
            }
            
                
        });
        
    }

    /**
     * Handler del evento `change` del input de archivos que se dispara cuando el usuario selecciona un archivo a subir.
     * 
     * Se encarga de llenar el array `files` con los archivos que el usuario haya seleccionado y emite los eventos correspondientes al componente padre.
     * 
     * @param $event el evento
     */
    _handleFilesChange($event: Event): void {
        const newFiles: FileList | null = (<HTMLInputElement>$event.target).files;

        if (!newFiles) {
            return;
        }

        for (let i = 0 ; i < newFiles.length ; i++) {
            const currentFile: File | null = newFiles.item(i);
            if(currentFile && this.validateFiles(currentFile)) {
                from(newFiles.item(i)?.arrayBuffer()!).pipe(
                    tap((buffer: ArrayBuffer) => {

                        const fileReader = new FileReader();
                        const fileSrc: Blob = new Blob([buffer]);

                        fileReader.onloadstart = async (event: ProgressEvent<FileReader>) => {

                            const fileIndex: number = this.files.findIndex(file => file.name == currentFile?.name);
                            const coolFile: CoolFile = {
                                src: fileSrc,
                                name: <string>currentFile?.name,
                                type: <string>currentFile?.type,
                                extension: currentFile?.name.substring(currentFile?.name.lastIndexOf("."), currentFile?.name.length),
                                progress: (event.loaded / event.total) * 100,
                                size: event.total,
                                loaded: event.loaded
                                
                            }
                            

                            if (fileIndex < 0) {
                                this.files.push(coolFile);
                            } else {
                                this.files[fileIndex] = coolFile;
                            }
                            this.changeDetectorRef.detectChanges();

                           
                                
                        };

                        fileReader.onprogress = (event: ProgressEvent<FileReader>) => {
                            const fileIndex: number = this.files.findIndex(file => file.name == currentFile?.name) ?? 0;

                            this.uploadService.uploadFile(this.files[fileIndex]).subscribe(elem=> {
                       
                                this.files[fileIndex].progress = (event.loaded / event.total) * 100;
                                this.files[fileIndex].loaded = event.loaded;

                                

                                if(elem.type ==4 ){
                                    const cloudinary_file = elem.body as Cloudinary;
                                
                                    this.files[fileIndex].cloudinary = cloudinary_file;
                                    this.files[fileIndex].name = cloudinary_file.public_id;
                                    if(this.files.every( (val, i, arr) => val.progress === 100 )){
                                        this.finalizaCarga.emit(this.files);
                                    }
                                    
                                    
                                }
                                
                                
                            });
                        };

                        /* fileReader.onloadend = (event: ProgressEvent<FileReader>) => {   //no se dispara nunca
                            if(this.files.every( (val, i, arr) => val.progress === 100 )){
                                //this.finalizaCarga.emit(this.files);
                                
                            }
                        }; */

                        fileReader.readAsArrayBuffer(fileSrc);
                    }),
                ).subscribe();
            }
        }
       
    }

    /**
     * Se valida si el archivo seran aceptado de acuerdo a los Inputs predefinidos
     * @param file el File
     */
    private validateFiles(file: File): boolean {
        let valid = true;
        if(file.size >= this.allowMaxFileSize) {
            this.snackBarService.open(`Archivos de hasta ${Math.round(this.allowMaxFileSize/1024/1024)} MB seran cargados.`, "Aceptar", 5000, "error-snackbar");
            valid = false;
        }
        if(this.allowFilesExtensions!='' && this.allowFilesExtensions.indexOf(file.name.replace(/.*\./, '').toLocaleLowerCase())< 0) {
            this.snackBarService.open(`Solo las extenciones ${this.allowFilesExtensions} estan permitidas.`, "Aceptar", 5000, "error-snackbar");
            valid = false;
        }
        return valid;
    }
}
