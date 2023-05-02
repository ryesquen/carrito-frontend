import { Component, Inject } from '@angular/core';
import { Articulo } from '../models/articulo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloService } from '../services/articulo.service';

@Component({
  selector: 'app-dialog-delete-articulo',
  templateUrl: './dialog-delete-articulo.component.html',
  styleUrls: ['./dialog-delete-articulo.component.css']
})
export class DialogDeleteArticuloComponent {
  tituloAccion = 'Eliminar'
  botonAccion = 'Eliminar'

  constructor(
    private dialogReferencia: MatDialogRef<DialogDeleteArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Articulo,
    private service: ArticuloService,
    private _snackBar: MatSnackBar
  ) {
  }

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  eliminar() {
    if (this.data) {
      this.service.deleteArticulo(this.data.id)
        .subscribe(
          {
            next: (response) => {
              this.mostrarAlerta('Se eliminó correctamente.', 'Eliminado')
              this.dialogReferencia.close('eliminado')
            },
            error: (error) => {
              this.mostrarAlerta('Error al eliminar.', 'Error')
            }
          })
    }
  }
}
