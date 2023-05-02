import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './identity/login/login.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AuthGuard } from './identity/guard/auth.guard';

const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'tienda', component: TiendaComponent, canActivate: [AuthGuard] },
  { path: 'articulo', component: ArticuloComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
