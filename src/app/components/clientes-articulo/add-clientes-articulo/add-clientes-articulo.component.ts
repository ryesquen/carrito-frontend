import { Component, Inject } from '@angular/core';
import { Cliente } from '../../cliente/interfaces/cliente';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Articulo } from '../../articulo/models/articulo';
import { ClienteService } from '../../cliente/service/cliente.service';
import { ArticuloService } from '../../articulo/services/articulo.service';
import { ClientesArticuloService } from '../service/clientes-articulo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesArticulo } from '../interfaces/cliente-articulo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-clientes-articulo',
  templateUrl: './add-clientes-articulo.component.html',
  styleUrls: ['./add-clientes-articulo.component.css']
})
export class AddClientesArticuloComponent {
  form: FormGroup;
  clientes: Cliente[] = []
  articulos: Articulo[] = []
  constructor(
    private builder: FormBuilder,
    private articuloService: ArticuloService,
    private clienteService: ClienteService,
    private clienteArticuloService: ClientesArticuloService,
    private dialogReferencia: MatDialogRef<AddClientesArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientesArticulo,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.builder.group({
      cliente: ['', []],
      articulo: ['', []],
      fecha: ['', []]
    });
  }

  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe(data => this.articulos = data)
    this.clienteService.getClientes().subscribe(data => this.clientes = data)
  }

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  add() {
    console.log(this.form.value)
    const object: ClientesArticulo = {
      id: this.form.value.id,
      clienteId: this.form.value.cliente,
      articuloId: this.form.value.articulo,
      fecha: null,
      clienteNombre: '',
      clienteApellido: '',
      articuloCodigo: '',
      articuloDescripcion: ''
    }
    this.clienteArticuloService.addClientesArticulo(object)
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
  }
}
