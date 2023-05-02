import { Component, Inject } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { ClienteService } from '../service/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

  tituloAccion = 'Eliminar'
  botonAccion = 'Eliminar'

  constructor(
    private dialogReferencia: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCliente: Cliente,
    private clienteService: ClienteService,
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
    if (this.dataCliente) {
      this.clienteService.deleteCliente(this.dataCliente.id)
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
