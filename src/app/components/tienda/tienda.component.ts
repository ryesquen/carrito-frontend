import { Component, ViewChild } from '@angular/core';
import { Tienda } from './interfaces/tienda';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TiendaService } from './service/tienda.service';
import { AddEditTiendaComponent } from './add-edit-tienda/add-edit-tienda.component';
import { DialoDeleteTiendaComponent } from './dialo-delete-tienda/dialo-delete-tienda.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  displayedColumns: string[] = ['id', 'sucursal', 'direccion', 'acciones'];
  dataSource = new MatTableDataSource<Tienda>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private service: TiendaService
  ) { }

  ngOnInit(): void {
    this.listarClientes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditTiendaComponent, {
      disableClose: true,
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'agregado') this.listarClientes()
    });
  }

  editar(tienda:Tienda) {
    this.dialog.open(AddEditTiendaComponent, {
      disableClose: true,
      width: "400px",
      data: tienda
    }).afterClosed().subscribe(result => {
      if (result === 'editado') this.listarClientes()
    });
  }

  eliminar(tienda:Tienda) {
    this.dialog.open(DialoDeleteTiendaComponent, {
      disableClose: true,
      width: "400px",
      data: tienda
    }).afterClosed().subscribe(result => {
      if (result === 'eliminado') this.listarClientes()
    });
  }

  listarClientes() {
    this.service.getTiendas().subscribe(data => this.dataSource.data = data)
  }
}
