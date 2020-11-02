import { Component, Input, OnInit } from '@angular/core';
import { dbFunctions } from '../../databaseAccess/dbFunc';

@Component({
  selector: 'app-entretenimiento',
  templateUrl: './entretenimiento.component.html',
  styleUrls: ['./entretenimiento.component.css']
})
export class EntretenimientoComponent implements OnInit {
  @Input() userName;
  @Input() actual;

  constructor(private dbAcc: dbFunctions) { }

  ngOnInit(): void {
  }

  guardarInformacion(){
    var musicaCeremonia = (document.getElementById("musicaCeremonia") as HTMLInputElement).value;
    var musicaEntrada = (document.getElementById("musicaEntrada") as HTMLInputElement).value;
    var musicaComida = (document.getElementById("musicaComida") as HTMLInputElement).value;
    var musicaBaile = (document.getElementById("musicaBaile") as HTMLInputElement).value; 

    
    this.dbAcc.write('formularios/'+this.actual+'/entretenimiento/musicaCeremonia',musicaCeremonia);
    this.dbAcc.write('formularios/'+this.actual+'/entretenimiento/musicaEntrada',musicaEntrada);
    this.dbAcc.write('formularios/'+this.actual+'/entretenimiento/musicaComida',musicaComida);
    this.dbAcc.write('formularios/'+this.actual+'/entretenimiento/musicaBaile',musicaBaile);

    var musicaCeremonia = (document.getElementById("musicaCeremonia") as HTMLInputElement).value="";
    var musicaEntrada = (document.getElementById("musicaEntrada") as HTMLInputElement).value="";
    var musicaComida = (document.getElementById("musicaComida") as HTMLInputElement).value="";
    var musicaBaile = (document.getElementById("musicaBaile") as HTMLInputElement).value="";
  }

}
