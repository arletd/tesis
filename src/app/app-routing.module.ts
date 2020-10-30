import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent} from './login/login.component';
import { FormularioInicialComponent } from './formulario-inicial/formulario-inicial.component';
import { GeneralComponent } from './usuario/general/general.component';
import { OrganizadorComponent } from './organizador/organizador.component';


const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent, 
  },
  {
    path: 'formularioInicial',
    component: FormularioInicialComponent, 
  },
  {
    path: 'general',
    component: GeneralComponent,
  },
  {
    path: 'organizador',
    component: OrganizadorComponent,
  },
  { 
    path: '', 
    redirectTo: 'principal', 
    pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
