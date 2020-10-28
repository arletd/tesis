import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locacion',
  templateUrl: './locacion.component.html',
  styleUrls: ['./locacion.component.css']
})
export class LocacionComponent implements OnInit {
  userName="Usuario 1";
  lugarCeremonia="templos";
  tipoCeremonia="religiosa";
  
  constructor() { }

  ngOnInit(): void {
  }

}
