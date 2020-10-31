import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
import { OrganizadorComponent } from './organizador/organizador.component';

const firebaseConfig = {
  apiKey: "AIzaSyBucAHuj7DkXXdnoAmZaZDCUPJK8lZfB68",
  authDomain: "tesita-6885a.firebaseapp.com",
  databaseURL: "https://tesita-6885a.firebaseio.com",
  projectId: "tesita-6885a",
  storageBucket: "tesita-6885a.appspot.com",
  messagingSenderId: "663947755480",
  appId: "1:663947755480:web:fc851eaa86986c57677cad"
};

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
    FormularioInicialComponent,
    OrganizadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
