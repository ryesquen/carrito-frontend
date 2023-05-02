import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditArticulosTiendaComponent } from './add-edit-articulos-tienda/add-edit-articulos-tienda.component';
import { DialogDeleteArticulosTiendaComponent } from './dialog-delete-articulos-tienda/dialog-delete-articulos-tienda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [
    AddEditArticulosTiendaComponent,
    DialogDeleteArticulosTiendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ArticulosTiendasModule { }
