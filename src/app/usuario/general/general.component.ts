import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
