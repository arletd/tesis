import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //Bibliotecas usadas para validacion
import { Router } from  "@angular/router";
import { AppComponent } from "./../app.component";
import { AngularFireAuth } from '@angular/fire/auth';
import { dbFunctions } from '../databaseAccess/dbFunc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  constructor( private dbAcc: dbFunctions, private formBuilder: FormBuilder, private router: Router,public afAuth: AngularFireAuth, private app: AppComponent){};
  ngOnInit() {
    this.form=this.formBuilder.group({
      emailInput: [null,Validators.compose([Validators.required, Validators.email])], //Campo de nombre, restriciones: requerido y solo letras
      psswd:[null, Validators.required]
    });
  }

  submit(){
    var user=((document.getElementById("inputUser") as HTMLInputElement).value);
    var psswd=((document.getElementById("inputPassword") as HTMLInputElement).value);
    this.login(user,psswd);
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        
        var llave=this.dbAcc.getKey(email);
        
        //Verificamos el tipo de acceso para saber a qué página mandarlo
        var tipoAcc= await this.dbAcc.read('/usuarios/'+llave+'/tipoAcceso');
        
        console.log(tipoAcc);
        //Es un usuario del tipo cliente
        if(tipoAcc=="A"){
          this.router.navigate(['/general/'+llave]);
        }
        //Es un usuario de tipo organizador
        else if(tipoAcc=="B"){
          this.router.navigate(['/organizador/'+llave]);
        }
        this.app.in=true;
      })
      //Imprimir errores posibles
      .catch(err => {
        alert('Algo salió mal:'+err.message);
      });
  }
}
