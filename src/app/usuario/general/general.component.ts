import { Component, OnInit } from '@angular/core';
import {dbFunctions} from './../../databaseAccess/dbFunc';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dbAcc: dbFunctions, public afAuth: AngularFireAuth) { }

  userKey;
  orgKey;
  actual;
  userName;
  orgName;

  ngOnInit(): void {
    this.userKey=this.route.snapshot.paramMap.get('id');
    this.datosDelUsuario();
  }

  async datosDelUsuario(){
    var aux = await this.dbAcc.read('/usuarios/'+this.userKey+"/");
    var obj = JSON.parse(JSON.stringify(aux));
    this.actual = obj.eventoActual;
    var nomAux = obj.nombre;
    var nomArray = nomAux.split(" ");
    this.userName=nomArray[0];
    this.getOrganizador();
  }

  async getOrganizador(){
    var org = await this.dbAcc.read('/eventos/'+this.actual+"/organiza");
    this.orgKey = org;
    this.datosOrganizador(org);
  }
  async datosOrganizador(org){
    var aux = await this.dbAcc.read('/usuarios/'+org+"/");
    var obj = JSON.parse(JSON.stringify(aux));
    var nomAux = obj.nombre;
    var nomArray = nomAux.split(" ");
    this.orgName=nomArray[0];
  }

  dispInicio: boolean = true;
  dispCeremonia: boolean = false;
  dispLocacion: boolean = false;
  dispDecoracion: boolean = false;
  dispBanquete: boolean = false;
  dispEntretenimiento: boolean = false;
  dispExtras: boolean = false;

  inicio(){
    this.dispInicio = true;
    this.dispCeremonia = false;
    this.dispLocacion = false;
    this.dispDecoracion = false;
    this.dispBanquete = false;
    this.dispEntretenimiento = false;
    this.dispExtras = false;
  }
  ceremonia(){
    this.dispInicio = false;
    this.dispCeremonia = true;
    this.dispLocacion = false;
    this.dispDecoracion = false;
    this.dispBanquete = false;
    this.dispEntretenimiento = false;
    this.dispExtras = false;
  }
  locacion(){
    this.dispInicio = false;
    this.dispCeremonia = false;
    this.dispLocacion = true;
    this.dispDecoracion = false;
    this.dispBanquete = false;
    this.dispEntretenimiento = false;
    this.dispExtras = false;
  }
  decoracion(){
    this.dispInicio = false;
    this.dispCeremonia = false;
    this.dispLocacion = false;
    this.dispDecoracion = true;
    this.dispBanquete = false;
    this.dispEntretenimiento = false;
    this.dispExtras = false;
  }
  banquete(){
    this.dispInicio = false;
    this.dispCeremonia = false;
    this.dispLocacion = false;
    this.dispDecoracion = false;
    this.dispBanquete = true;
    this.dispEntretenimiento = false;
    this.dispExtras = false;
  }
  entretenimiento(){
    this.dispInicio = false;
    this.dispCeremonia = false;
    this.dispLocacion = false;
    this.dispDecoracion = false;
    this.dispBanquete = false;
    this.dispEntretenimiento = true;
    this.dispExtras = false;
  }
  extras(){
    this.dispInicio = false;
    this.dispCeremonia = false;
    this.dispLocacion = false;
    this.dispDecoracion = false;
    this.dispBanquete = false;
    this.dispEntretenimiento = false;
    this.dispExtras = true;
  }

}
