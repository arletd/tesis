import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent implements OnInit {
  userName="Usuario 1";
  bienvenido="Bienvenido";
  organizador="Organizador 1";

  constructor() { }

  ngOnInit(): void {
  }

}
