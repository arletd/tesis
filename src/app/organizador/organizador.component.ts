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
  ultimaFecha;
  

  prueba(){
    var detalles = (document.getElementById("detallesCeremonia1") as HTMLInputElement).value;
    (document.getElementById("detCer1") as HTMLSpanElement).innerText=detalles;
    
  }
}
