import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArticulosTienda } from './interfaces/articulo-tienda';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ArticulosTiendaService } from './articulos-tienda.service';
import { AddEditArticulosTiendaComponent } from './add-edit-articulos-tienda/add-edit-articulos-tienda.component';
import { DialogDeleteArticulosTiendaComponent } from './dialog-delete-articulos-tienda/dialog-delete-articulos-tienda.component';

@Component({
  selector: 'app-articulos-tiendas',
  templateUrl: './articulos-tiendas.component.html',
  styleUrls: ['./articulos-tiendas.component.css']
})
export class ArticulosTiendasComponent {
  displayedColumns: string[] = ['articuloId', 'tiendaId', 'articuloCodigo', 'tiendaSucursal', 'articuloStock', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<ArticulosTienda>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private service: ArticulosTiendaService
  ) { }

  ngOnInit(): void {
    this.listarClientes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditArticulosTiendaComponent, {
      disableClose: true,
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'agregado') this.listarClientes()
    });
  }

  eliminar(object: ArticulosTienda) {
    this.dialog.open(DialogDeleteArticulosTiendaComponent, {
      disableClose: true,
      width: "400px",
      data: object
    }).afterClosed().subscribe(result => {
      if (result === 'eliminado') this.listarClientes()
    });
  }

  listarClientes() {
    this.service.getArticulosTienda().subscribe(data => this.dataSource.data = data)
  }
}
