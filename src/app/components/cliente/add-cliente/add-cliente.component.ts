import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../interfaces/cliente';
import { ClienteService } from '../service/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {

  tituloAccion = 'Nuevo'
  botonAccion = 'Agregar'
  clienteForm: FormGroup;

  constructor(
    private dialogReferencia: MatDialogRef<AddClienteComponent>,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataCliente: Cliente
  ) {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      apellido: ['', [Validators.required, Validators.maxLength(200)]],
      direccion: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    if (this.dataCliente) {
      this.tituloAccion = 'Editar'
      this.botonAccion = 'Actualizar'
      this.clienteForm.patchValue(
        {
          nombre: this.dataCliente.nombre,
          apellido: this.dataCliente.apellido,
          direccion: this.dataCliente.direccion
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
    const cliente: Cliente = {
      id: 0,
      nombre: this.clienteForm.value.nombre,
      apellido: this.clienteForm.value.apellido,
      direccion: this.clienteForm.value.direccion
    }
    if (this.dataCliente == null) {
      this.clienteService.addCliente(cliente)
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
      cliente.id = this.dataCliente.id
      this.clienteService.updateCliente(cliente.id, cliente)
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
