import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from '../../articulo/services/articulo.service';
import { TiendaService } from '../../tienda/service/tienda.service';
import { ArticulosTiendaService } from '../articulos-tienda.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticulosTienda } from '../interfaces/articulo-tienda';
import { Articulo } from '../../articulo/models/articulo';
import { Tienda } from '../../tienda/interfaces/tienda';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-articulos-tienda',
  templateUrl: './add-edit-articulos-tienda.component.html',
  styleUrls: ['./add-edit-articulos-tienda.component.css']
})
export class AddEditArticulosTiendaComponent implements OnInit {
  form: FormGroup;
  tiendas: Tienda[] = []
  articulos: Articulo[] = []
  constructor(
    private builder: FormBuilder,
    private articuloService: ArticuloService,
    private tiendaService: TiendaService,
    private articulosTiendaService: ArticulosTiendaService,
    private dialogReferencia: MatDialogRef<AddEditArticulosTiendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticulosTienda,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.builder.group({
      tienda: ['', []],
      articulo: ['', []],
      fecha: ['', []]
    });
  }

  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe(data => this.articulos = data)
    this.tiendaService.getTiendas().subscribe(data => this.tiendas = data)
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
    const articuloTienda: ArticulosTienda = {
      tiendaId: this.form.value.tienda,
      articuloId: this.form.value.articulo,
      stock:null,
      fecha: null,
      articuloCodigo: '',
      tiendaSucursal: ''
    }
    this.articulosTiendaService.addArticulosTienda(articuloTienda)
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
