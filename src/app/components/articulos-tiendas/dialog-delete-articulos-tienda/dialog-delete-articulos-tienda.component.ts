import { Component, Inject } from '@angular/core';
import { ArticulosTienda } from '../interfaces/articulo-tienda';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticulosTiendaService } from '../articulos-tienda.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-delete-articulos-tienda',
  templateUrl: './dialog-delete-articulos-tienda.component.html',
  styleUrls: ['./dialog-delete-articulos-tienda.component.css']
})
export class DialogDeleteArticulosTiendaComponent {
  tituloAccion = 'Eliminar'
  botonAccion = 'Eliminar'

  constructor(
    private dialogReferencia: MatDialogRef<DialogDeleteArticulosTiendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticulosTienda,
    private service: ArticulosTiendaService,
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
      this.service.deleteArticulosTienda(this.data.articuloId, this.data.tiendaId)
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
