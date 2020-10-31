import { Component, OnInit } from '@angular/core';
import { FechaEsp } from './../fecha';

@Component({
  selector: 'app-organizador',
  templateUrl: './organizador.component.html',
  styleUrls: ['./organizador.component.css']
})
export class OrganizadorComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  ultimaFecha=new Date();
  

  prueba(){
    var fechaFinal=new Date(this.ultimaFecha.getTime() + 7*24*60*60*1000);
    var fechaAux=new FechaEsp(fechaFinal);
    console.log(fechaAux);
    var detalles = (document.getElementById("detallesCeremonia1") as HTMLInputElement).value;
    (document.getElementById("detCer1") as HTMLSpanElement).innerText=detalles;
    (document.getElementById("fechaCer1prop") as HTMLSpanElement).innerText=fechaAux.toString();
  }
}
