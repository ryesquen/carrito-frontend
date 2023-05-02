import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './identity/login/login.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AuthGuard } from './identity/guard/auth.guard';
import { ArticulosTiendasComponent } from './components/articulos-tiendas/articulos-tiendas.component';
import { ClientesArticuloComponent } from './components/clientes-articulo/clientes-articulo.component';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'tienda', component: TiendaComponent, canActivate: [AuthGuard] },
  { path: 'articulo', component: ArticuloComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'articulotienda', component: ArticulosTiendasComponent, canActivate: [AuthGuard] },
  { path: 'clientesarticulos', component: ClientesArticuloComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
