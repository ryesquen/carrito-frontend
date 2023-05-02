import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientesArticuloComponent } from './add-clientes-articulo/add-clientes-articulo.component';
import { DeleteDialogClientesArticuloComponent } from './delete-dialog-clientes-articulo/delete-dialog-clientes-articulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [
    AddClientesArticuloComponent,
    DeleteDialogClientesArticuloComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ClientesArticuloModule { }
