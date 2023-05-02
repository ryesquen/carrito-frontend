import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './tienda.component';
import { AddEditTiendaComponent } from './add-edit-tienda/add-edit-tienda.component';
import { DialoDeleteTiendaComponent } from './dialo-delete-tienda/dialo-delete-tienda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [
    TiendaComponent,
    AddEditTiendaComponent,
    DialoDeleteTiendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TiendaModule { }
