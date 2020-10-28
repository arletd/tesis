import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ceremonia',
  templateUrl: './ceremonia.component.html',
  styleUrls: ['./ceremonia.component.css']
})
export class CeremoniaComponent implements OnInit {
  userName="Usuario 1";
  lugarCeremonia="templos";
  tipoCeremonia="religiosa";
  constructor() { }

  ngOnInit(): void {
  }

}
