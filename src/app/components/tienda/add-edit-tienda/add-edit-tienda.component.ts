import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from '../service/tienda.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tienda } from '../interfaces/tienda';

@Component({
  selector: 'app-add-edit-tienda',
  templateUrl: './add-edit-tienda.component.html',
  styleUrls: ['./add-edit-tienda.component.css']
})
export class AddEditTiendaComponent {
  tituloAccion = 'Nuevo'
  botonAccion = 'Agregar'
  form: FormGroup;

  constructor(
    private dialogReferencia: MatDialogRef<AddEditTiendaComponent>,
    private service: TiendaService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Tienda
  ) {
    this.form = this.formBuilder.group({
      sucursal: ['', [Validators.required, Validators.maxLength(200)]],
      direccion: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.tituloAccion = 'Editar'
      this.botonAccion = 'Actualizar'
      this.form.patchValue(
        {
          sucursal: this.data.sucursal,
          direccion: this.data.direccion
        }
      )
    }
  }

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  addEdit() {
    const tienda: Tienda = {
      id: 0,
      sucursal: this.form.value.sucursal,
      direccion: this.form.value.direccion
    }
    if (this.data == null) {
      this.service.addTienda(tienda)
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
      tienda.id = this.data.id
      this.service.updateTienda(tienda.id, tienda)
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
}
