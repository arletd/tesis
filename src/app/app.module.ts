import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeneralComponent } from './usuario/general/general.component';
import { PrincipalComponent } from './principal/principal.component';
import { PantallaInicioComponent } from './usuario/pantalla-inicio/pantalla-inicio.component';
import { CeremoniaComponent } from './usuario/ceremonia/ceremonia.component';
import { LocacionComponent } from './usuario/locacion/locacion.component';
import { DecoracionComponent } from './usuario/decoracion/decoracion.component';
import { BanqueteComponent } from './usuario/banquete/banquete.component';
import { EntretenimientoComponent } from './usuario/entretenimiento/entretenimiento.component';
import { ExtrasComponent } from './usuario/extras/extras.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { FormularioInicialComponent } from './formulario-inicial/formulario-inicial.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    PrincipalComponent,
    PantallaInicioComponent,
    CeremoniaComponent,
    LocacionComponent,
    DecoracionComponent,
    BanqueteComponent,
    EntretenimientoComponent,
    ExtrasComponent,
    LoginComponent,
    AboutComponent,
    FormularioInicialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
