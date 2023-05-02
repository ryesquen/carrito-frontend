import { Component, ViewChild } from '@angular/core';
import { ClientesArticulo } from './interfaces/cliente-articulo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClientesArticuloService } from './service/clientes-articulo.service';
import { AddClientesArticuloComponent } from './add-clientes-articulo/add-clientes-articulo.component';
import { DeleteDialogClientesArticuloComponent } from './delete-dialog-clientes-articulo/delete-dialog-clientes-articulo.component';

@Component({
  selector: 'app-clientes-articulo',
  templateUrl: './clientes-articulo.component.html',
  styleUrls: ['./clientes-articulo.component.css']
})
export class ClientesArticuloComponent {
  displayedColumns: string[] = ['id', 'clienteId', 'clienteNombre', 'clienteApellido', 'articuloId', 'articuloCodigo', 'articuloDescripcion', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<ClientesArticulo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private service: ClientesArticuloService
  ) { }

  ngOnInit(): void {
    this.listarClientes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddClientesArticuloComponent, {
      disableClose: true,
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'agregado') this.listarClientes()
    });
  }

  eliminar(object: ClientesArticulo) {
    this.dialog.open(DeleteDialogClientesArticuloComponent, {
      disableClose: true,
      width: "400px",
      data: object
    }).afterClosed().subscribe(result => {
      if (result === 'eliminado') this.listarClientes()
    });
  }

  listarClientes() {
    this.service.getClientesArticulo().subscribe(data => this.dataSource.data = data)
  }
}
