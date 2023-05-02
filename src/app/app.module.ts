import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticuloModule } from './components/articulo/articulo.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ClienteModule } from './components/cliente/cliente.module';
import { MaterialModule } from 'src/material.module';
import { LoginComponent } from './identity/login/login.component';
import { TiendaModule } from './components/tienda/tienda.module';
import { ArticulosTiendasComponent } from './components/articulos-tiendas/articulos-tiendas.component';
import { ArticulosTiendasModule } from './components/articulos-tiendas/articulos-tiendas.module';
import { ClientesArticuloComponent } from './components/clientes-articulo/clientes-articulo.component';
import { ClientesArticuloModule } from './components/clientes-articulo/clientes-articulo.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticulosTiendasComponent,
    ClientesArticuloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArticuloModule,
    ClienteModule,
    TiendaModule,
    ArticulosTiendasModule,
    ClientesArticuloModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
