import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [
    ClienteComponent,
    AddClienteComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ], exports: [
    ClienteComponent
  ]
})
export class ClienteModule { }
