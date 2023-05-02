import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloComponent } from './articulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogDeleteArticuloComponent } from './dialog-delete-articulo/dialog-delete-articulo.component'
import { AddEditArticuloComponent } from './add-edit-articulo/add-edit-articulo.component';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    ArticuloComponent,
    AddEditArticuloComponent,
    DialogDeleteArticuloComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ], exports: [
    ArticuloComponent
  ]
})
export class ArticuloModule { }
