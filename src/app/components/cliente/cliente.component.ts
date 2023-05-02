import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from './service/cliente.service';
import { Cliente } from './interfaces/cliente';
import { MatDialog } from '@angular/material/dialog';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'direccion', 'acciones'];
  ELEMENT_DATA: Cliente[] = [];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.listarClientes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddClienteComponent, {
      disableClose: true,
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'agregado') this.listarClientes()
    });
  }

  editarCliente(cliente: Cliente) {
    this.dialog.open(AddClienteComponent, {
      disableClose: true,
      width: "400px",
      data: cliente
    }).afterClosed().subscribe(result => {
      if (result === 'editado') this.listarClientes()
    });
  }

  eliminarCliente(cliente: Cliente) {
    this.dialog.open(DialogDeleteComponent, {
      disableClose: true,
      width: "400px",
      data: cliente
    }).afterClosed().subscribe(result => {
      if (result === 'eliminado') this.listarClientes()
    });
  }

  listarClientes() {
    this.clienteService.getClientes().subscribe(data => this.dataSource.data = data)
  }
}


