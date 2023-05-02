import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticuloService } from './services/articulo.service';
import { Articulo } from './models/articulo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddEditArticuloComponent } from './add-edit-articulo/add-edit-articulo.component';
import { DialogDeleteArticuloComponent } from './dialog-delete-articulo/dialog-delete-articulo.component';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigo', 'descripcion', 'precio', 'imagen', 'stock', 'acciones'];
  dataSource = new MatTableDataSource<Articulo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private articuloService: ArticuloService
  ) { }

  ngOnInit(): void {
    this.listarArticulos()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditArticuloComponent, {
      disableClose: true,
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'agregado') this.listarArticulos()
    });
  }

  editarArticulo(articulo: Articulo) {
    this.dialog.open(AddEditArticuloComponent, {
      disableClose: true,
      width: "400px",
      data: articulo
    }).afterClosed().subscribe(result => {
      if (result === 'editado') this.listarArticulos()
    });
  }

  eliminarArticulo(articulo: Articulo) {
    this.dialog.open(DialogDeleteArticuloComponent, {
      disableClose: true,
      width: "400px",
      data: articulo
    }).afterClosed().subscribe(result => {
      if (result === 'eliminado') this.listarArticulos()
    });
  }

  listarArticulos() {
    this.articuloService.getArticulos().subscribe(data => this.dataSource.data = data)
  }
  // articuloForm: FormGroup;
  // imageBase64: any
  // articulos: Articulo[] = []

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private articuloService: ArticuloService
  // ) {
  //   this.articuloForm = this.formBuilder.group({
  //     codigo: ['', [Validators.required, Validators.maxLength(10)]],
  //     descripcion: ['', [Validators.required, Validators.maxLength(50)]],
  //     precio: [0, Validators.min(0)],
  //     imagen: '',
  //     stock: [0, Validators.min(0)]
  //   });
  // }
  // ngOnInit(): void {
  //   this.listarArticulos()
  // }
  // listarArticulos(){
  //   this.articuloService.getArticulos().subscribe(data => this.articulos = data)
  // }
  // onSubmit(): void {
  //   this.articuloForm.value.imagen = this.imageBase64.split('base64,')[1]
  //   const articulo: Articulo = {
  //     id: 0,
  //     codigo: this.articuloForm.value.codigo,
  //     descripcion: this.articuloForm.value.descripcion,
  //     precio: this.articuloForm.value.precio,
  //     imagen: this.articuloForm.value.imagen,
  //     stock: this.articuloForm.value.stock
  //   };
  //   this.articuloService.addArticulo(articulo)
  //     .subscribe(() => {
  //       this.listarArticulos()
  //     });
  // }
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.imageBase64 = reader.result
  //   }

  //   reader.readAsDataURL(file);
  // }
}
