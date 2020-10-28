import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //Bibliotecas usadas para validacion
import { Router } from  "@angular/router";
import { AppComponent } from "./../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  constructor( private fb: FormBuilder, private router: Router, private app: AppComponent){};
  ngOnInit() {
    this.form=this.fb.group({
      emailInput: [null,Validators.compose([Validators.required, Validators.email])], //Campo de nombre, restriciones: requerido y solo letras
      psswd:[null, Validators.required]
    });
  }

  submit(){
    this.router.navigate(['/general']);
    this.app.in=true;

  }
}
