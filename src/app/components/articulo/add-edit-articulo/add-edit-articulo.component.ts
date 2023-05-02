import { ArticuloService } from './../services/articulo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Articulo } from '../models/articulo';

@Component({
  selector: 'app-add-edit-articulo',
  templateUrl: './add-edit-articulo.component.html',
  styleUrls: ['./add-edit-articulo.component.css']
})
export class AddEditArticuloComponent implements OnInit {
  tituloAccion = 'Nuevo'
  botonAccion = 'Agregar'
  form: FormGroup
  imageBase64: any
  selectedFile: any = null

  constructor(
    private dialogReferencia: MatDialogRef<AddEditArticuloComponent>,
    private service: ArticuloService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Articulo
  ) {
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.maxLength(200)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: ['', [Validators.required]],
      imagen: ['', []],
      stock: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.tituloAccion = 'Editar'
      this.botonAccion = 'Actualizar'
      this.form.patchValue(
        {
          codigo: this.data.codigo,
          descripcion: this.data.descripcion,
          precio: this.data.precio,
          imagen: this.data.imagen,
          stock: this.data.stock
        }
      )
    }
  }

  addEdit() {
    const object: Articulo = {
      id: 0,
      codigo: this.form.value.codigo,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      imagen: this.form.value.imagen,
      stock: this.form.value.stock
    }
    if (this.data == null) {
      object.imagen = this.imageBase64.split('base64,')[1]
      this.service.addArticulo(object)
        .subscribe(
          {
            next: (response) => {
              this.mostrarAlerta('Se registró correctamente.', 'Agregado')
              this.dialogReferencia.close('agregado')
            },
            error: (error) => {
              this.mostrarAlerta('Error al registrar.', 'Error')
            }
          })
    } else {
      object.id = this.data.id
      this.service.updateArticulo(object.id, object)
        .subscribe(
          {
            next: (response) => {
              this.mostrarAlerta('Se actualizó correctamente.', 'Actualizado')
              this.dialogReferencia.close('editado')
            },
            error: (error) => {
              this.mostrarAlerta('Error al actualizar.', 'Error')
            }
          })
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result
    }
    reader.readAsDataURL(file);
  }

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
