import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent implements OnInit {

  @Input() userName;
  @Input() userKey;
  @Input() orgName;
  @Input() orgKey;
  @Input() actual;
  
  
  constructor() { }

  ngOnInit(): void {
  }


}
