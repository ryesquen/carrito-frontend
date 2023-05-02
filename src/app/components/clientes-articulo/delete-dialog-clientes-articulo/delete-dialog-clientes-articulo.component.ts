import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesArticulo } from '../interfaces/cliente-articulo';
import { ClientesArticuloService } from '../service/clientes-articulo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog-clientes-articulo',
  templateUrl: './delete-dialog-clientes-articulo.component.html',
  styleUrls: ['./delete-dialog-clientes-articulo.component.css']
})
export class DeleteDialogClientesArticuloComponent {
  tituloAccion = 'Eliminar'
  botonAccion = 'Eliminar'

  constructor(
    private dialogReferencia: MatDialogRef<DeleteDialogClientesArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientesArticulo,
    private service: ClientesArticuloService,
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
      this.service.deleteClientesArticulo(this.data.id)
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
