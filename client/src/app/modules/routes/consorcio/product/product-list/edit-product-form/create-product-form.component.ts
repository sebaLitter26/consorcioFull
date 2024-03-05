
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateProductPayload, Product, UpdateProductPayload } from '../..';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CoolFile } from '../../../../../ui/cool-file-input';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
  ? FormGroup<ControlsOf<T[K]>>
  : FormControl<T[K]>;
};

/**
 * Componente para manejar el form de crear un nuevo conteo
 */
@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductFormComponent implements OnInit {
  /** El form para crear un conteo nuevo */
  productForm = new FormGroup<ControlsOf<CreateProductPayload>> ({
    /** `FormControl` con el tipo de legajo a filtrar. */
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    brand: new FormControl('',{
        nonNullable: true,
        validators: [Validators.required]
    }),
    price: new FormControl(200,{
        nonNullable: true,
        validators: [Validators.required, Validators.pattern("^[0-9]{1,5}$")]
    }),
    stock: new FormControl(10,{
      nonNullable: true,
      validators: [Validators.required, Validators.pattern("^[0-9]{1,3}$")]
    }),
    description: new FormControl('',{
      nonNullable: true,
    }),
    images: new FormControl(<string[]>[], {nonNullable: true})
  });

  /** Se utiliza para mostrar la spinning wheel mientras carga */
  bFetchingData: boolean = false;

  bSubmitting: boolean = false;

  productAction: string = 'Cre';

  images: string[] = [];

  constructor(
    //private gdmService: GdmService, 
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<CreateProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductService,
  ) { 
    
    if(this.product){
        this.images = this.product.images;
        this.productAction = 'Modific';
        this.productForm.patchValue({
        description: this.product.description ?? this.product.name + ' ' + this.product.brand,
        name: this.product.name,
        stock: this.product.stock,
        price: this.product.price,
        brand: this.product.brand,
        images: this.images
      })
    }
  }


  ngOnInit(): void {


    /** Busca el PLU despues de un tiempo de escribir el input 
    this.productForm.get('plu')!.valueChanges.pipe(debounceTime(2000)).subscribe(pluInput => this.showPluDetails(pluInput));
    this.productForm.get('plu')!.valueChanges.subscribe(() => { if(this.productForm.get('plu')!.dirty) this.bFetchingData = true });
    */
  }

  onSubmit(){
    this.bSubmitting = true;
    let fn =() => this.productService.createProduct
    let payload: CreateProductPayload | UpdateProductPayload = {
        name: this.productForm.controls.name.value,
        price: +this.productForm.controls.price?.value,
        stock: +this.productForm.controls.stock?.value,
        brand: this.productForm.controls.brand?.value,
        description: this.productForm.controls.description?.value,
        images: this.images
    }
    
    if(this.product){
        fn =() => this.productService.updateProduct
        payload = {...payload, id: this.product.id}
        
    }
    
    fn().bind(this.productService)( payload).subscribe({
      next: () => {
        this.snackBarService.open(`Se ${this.productAction}o el producto.`, "Aceptar", 6000, "success-snackbar");
        this.productService.updateTable();
        this.dialogRef.close(); 
      },
      
      error: (error: any) => this.bSubmitting = false,
    });
  }

  /**
   * Envia el formulario al endpoint cuando se da Aceptar en el form
   
  createproduct(){
    this.bSubmitting = true;
    const payload: CreateproductPayload = {
        address: this.productForm.controls.address.value,
        location: this.productForm.controls.location?.value,
        floors: this.productForm.controls.floors?.value,
        letter: this.productForm.controls.letter?.value,
        images: this.images.map(elem=> JSON.stringify(elem.cloudinary)),
    }
    console.log(payload);
    this.productService.createproduct(payload).subscribe({
      next: () => {
        this.snackBarService.open(`Se agrego el nuevo edificio.`, "Aceptar", 6000, "success-snackbar");
        this.productsService.updateTable();
        this.dialogRef.close(); 
      },
      
      error: (error) => this.bSubmitting = false,
    });
  }
*/
 

  addFile(images:CoolFile[]){
    if(!images) return;
    this.bSubmitting = true;
    const payload: UpdateProductPayload = {
        id: this.product.id,
        description: this.product.description,
        name: this.product.name,
        stock: this.product.stock,
        price: this.product.price,
        brand: this.product.brand,
        images: (images) ? images.map(elem=> JSON.stringify(elem.cloudinary)) : []
    }
    
    this.productService.updateProduct(payload).subscribe({
      next: (data:Product) => {
        
        
        this.images = [...data.images],

        console.log(this.images);
        
        
        this.snackBarService.open(`Se modificaron las fotos del edificio.`, "Aceptar", 6000, "success-snackbar");
        this.bSubmitting = false;
        this.productService.updateTable();
      },
      
      error: (error: any) => {
            this.bSubmitting = false;
            this.snackBarService.open(`ERROR: ${error}`, "Aceptar", 6000, "error-snackbar");
        }
    });
    
    /* this.images.push(...event);
    const sources = this.images.map(elem=> JSON.stringify(elem.cloudinary)); */
    //this.productForm.controls.images.setValue(sources);
    
}

  /**
   * [NO FUNCIONA] Un validator para ver si se encontro el plu buscado
   * Es valido productPlu no es null
   * @returns ValidatorFn para verificar que el formControl plu sea valido
  
  pluValidator(plu: productsListProduct | null): ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
      if(plu != null){
        return null;
      }
      else return {'pluInvalido': control.value}
    }
  }

  isSubmitButtonDisabled(): boolean {
    let enabled = (Number(this.productForm.get('tipo_product')!.value) == productType.TODOS_LOS_PLU || this.productPlu !== null)
      && !this.bFetchingData;
    return !enabled;
  }

  /**
   * Busca el plu solicitado, si es valido se lo asigna a productPlu y se muestra, si no encuentra el plu muestra un error
   * @param plu El plu a buscar, ingresado en el input
   
   showPluDetails(plu: string){
    this.bFetchingData = false;
    if(plu === null) {
      this.productPlu = null; 
      return;
    }
    */
    // Si gdmService no encuentra el plu devuelve un undefined object, no devuelve un error
    /* this.gdmService.getPluInformation(plu).subscribe(pluObject => {
      if(pluObject !== undefined){
        this.productPlu = {plu: plu, descripcion: pluObject.descripcion, imagen: PluUtils.buildPluImageUrl(plu)};
      }
      else {
        this.snackBarService.open("PLU no encontrado", "Aceptar", 5000, "error-snackbar");
        this.productPlu = null; 
      } 
    }) 
  }

  resetPluControl(){
    if(this.productForm.get('plu')!.dirty) {
      this.productPlu = null;
      this.productForm.get('plu')!.reset();
    }
  }
  */
}
