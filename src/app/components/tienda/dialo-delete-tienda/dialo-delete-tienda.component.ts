import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tienda } from '../interfaces/tienda';
import { TiendaService } from '../service/tienda.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialo-delete-tienda',
  templateUrl: './dialo-delete-tienda.component.html',
  styleUrls: ['./dialo-delete-tienda.component.css']
})
export class DialoDeleteTiendaComponent {
  tituloAccion = 'Eliminar'
  botonAccion = 'Eliminar'

  constructor(
    private dialogReferencia: MatDialogRef<DialoDeleteTiendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tienda,
    private service: TiendaService,
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
      this.service.deleteTienda(this.data.id)
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
